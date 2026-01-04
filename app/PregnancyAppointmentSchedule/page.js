'use client';

import { useState } from 'react';
import Link from 'next/link';
import DatePicker, { registerLocale } from 'react-datepicker';
import th from 'date-fns/locale/th';
import styles from './page.module.css';
import "react-datepicker/dist/react-datepicker.css";

// ลงทะเบียน locale ภาษาไทยสำหรับ DatePicker เพื่อให้แสดงผลเดือนและวันเป็นภาษาไทย
registerLocale('th', th);

/**
 * =====================================================================
 * AddressModal Component
 * =====================================================================
 * คอมโพเนนต์สำหรับแสดง Modal (หน้าต่าง Pop-up) ที่อยู่ของโรงพยาบาล
 * @param {object} props - Props ที่ส่งเข้ามา
 * @param {function} props.onClose - ฟังก์ชันที่จะถูกเรียกเมื่อผู้ใช้กดปิด Modal
 */
const AddressModal = ({ onClose }) => (
  <div className={styles.modalOverlay}>
    <div className={styles.modalContent}>
      <button
        onClick={onClose}
        className={styles.modalCloseButton}
        aria-label="ปิด"
      >
        <svg width="28" height="28" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12"></path></svg>
      </button>
      <h3 className={styles.modalTitle}>ที่อยู่โรงพยาบาล</h3>
      <div className={styles.modalAddress}>
        <p><strong>โรงพยาบาลชุมชนเทศบาลเมืองกำแพงเพชร</strong></p>
        <p>35 ซ.2 ถ.ราชดำเนิน 1</p>
        <p>ต.ในเมือง อ.เมือง จ.กำแพงเพชร 62000</p>
      </div>
      <div className={styles.modalActions}>
        <a href="https://maps.app.goo.gl/476B9SRvUWvMctSm7" target="_blank" rel="noopener noreferrer" className={styles.fullWidthLink}>
          <button className={`${styles.button} ${styles.buttonPrimary}`}>
            เปิดใน Google Maps
          </button>
        </a>
        <button
          onClick={onClose}
          className={`${styles.button} ${styles.buttonSecondary}`}
        >
          ปิด
        </button>
      </div>
    </div>
  </div>
);

/**
 * =====================================================================
 * Initial Form Data
 * =====================================================================
 * ออบเจ็กต์ที่เก็บค่าเริ่มต้นสำหรับฟอร์มลงทะเบียน
 * ใช้สำหรับ Reset ค่าในฟอร์มหลังจากส่งข้อมูลสำเร็จ
 */
const initialFormData = {
  firstName: '',
  lastName: '',
  phone: '',
  nationalId: '',
  appointmentDate: '',
  appointmentTime: '',
  service: '',
  notes: ''
};

/**
 * =====================================================================
 * AppointmentRegistration Page Component
 * =====================================================================
 * คอมโพเนนต์หลักสำหรับหน้าลงทะเบียนการนัดหมาย
 * - จัดการ State ของฟอร์มทั้งหมด (ข้อมูลที่ผู้ใช้กรอก, สถานะการโหลด, ข้อผิดพลาด)
 * - มีการตรวจสอบความถูกต้องของข้อมูล (Validation) ก่อนส่ง
 * - ส่งข้อมูลไปยัง API 2 ตัวพร้อมกัน: /api/notify (สำหรับ LINE Notify) และ /api/saveToSheet (สำหรับ Google Sheets)
 * - แสดงผลหน้าจอแตกต่างกันตามสถานะ: ฟอร์มลงทะเบียน, หน้าจอลงทะเบียนสำเร็จ
 */
export default function AppointmentRegistration() {
  // --- Component States ---

  // State สำหรับเก็บข้อมูลทั้งหมดที่ผู้ใช้กรอกในฟอร์ม
  const [formData, setFormData] = useState(initialFormData);
  // State สำหรับเก็บค่าวันและเวลาที่เลือกจาก DatePicker (เป็น object Date) เพื่อการแสดงผล
  const [selectedDateTime, setSelectedDateTime] = useState(null);
  // State สำหรับตรวจสอบว่าฟอร์มถูกส่งและลงทะเบียนสำเร็จแล้วหรือยัง (เพื่อสลับหน้าจอ)
  const [isSubmitted, setIsSubmitted] = useState(false);
  // State สำหรับจัดการสถานะการโหลด (Loading) ขณะที่กำลังส่งข้อมูล
  const [isLoading, setIsLoading] = useState(false);
  // State สำหรับเก็บข้อความข้อผิดพลาด (Error Message) ที่จะแสดงให้ผู้ใช้เห็น
  const [error, setError] = useState('');
  // State สำหรับตรวจสอบว่าผู้ใช้ได้ยอมรับนโยบายความเป็นส่วนตัวแล้วหรือยัง
  const [hasConsented, setHasConsented] = useState(false);
  // State สำหรับเปิด/ปิด Modal แสดงที่อยู่
  const [isModalOpen, setIsModalOpen] = useState(false);

  /**
   * จัดการการเปลี่ยนแปลงค่าใน input fields ทั่วไป
   * @param {React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>} e - Event object
   */
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    // Clear error when user starts typing
    if (error) setError('');
  };

  const handleDateChange = (date) => {
    setSelectedDateTime(date);

    if (date) {
      const datePart = date.toISOString().split('T')[0];
      const timePart = `${String(date.getHours()).padStart(2, '0')}:${String(date.getMinutes()).padStart(2, '0')}`;

      setFormData(prev => ({ ...prev, appointmentDate: datePart, appointmentTime: timePart }));
    } else {
      setFormData(prev => ({ ...prev, appointmentDate: '', appointmentTime: '' }));
    }

    // Clear error when user starts selecting a date
    if (error) setError('');
  };

  /**
   * ตรวจสอบความถูกต้องของข้อมูลในฟอร์ม
   * @returns {boolean} - คืนค่า true ถ้าข้อมูลถูกต้อง, false ถ้าไม่ถูกต้อง
   */
  const validateForm = () => {
    const requiredFields = ['firstName', 'lastName', 'phone', 'nationalId', 'appointmentDate', 'appointmentTime', 'service'];
    const emptyFields = requiredFields.filter(field => !formData[field].trim());
    
    if (emptyFields.length > 0) {
      setError('กรุณากรอกข้อมูลที่จำเป็นให้ครบถ้วน');
      return false;
    }

    // Phone validation
    const phoneRegex = /^[0-9]{9,10}$/;
    if (!phoneRegex.test(formData.phone.replace(/[-\s]/g, ''))) {
      setError('กรุณากรอกเบอร์โทรศัพท์ให้ถูกต้อง');
      return false;
    }

    // National ID validation
    const nationalIdRegex = /^[0-9]{13}$/;
    if (!nationalIdRegex.test(formData.nationalId.replace(/[-\s]/g, ''))) {
      setError('กรุณากรอกเลขบัตรประชาชน 13 หลักให้ถูกต้อง');
      return false;
    }

    return true;
  };

  /**
   * จัดการการส่งข้อมูลฟอร์ม
   * @param {React.FormEvent<HTMLFormElement>} e - Event object
   */
  const handleSubmit = async (e) => {
    e.preventDefault();
    
    // ถ้าข้อมูลไม่ถูกต้อง หรือยังไม่ยอมรับข้อตกลง ให้หยุดการทำงาน
    if (!validateForm() || !hasConsented) return;

    setIsLoading(true);
    setError('');

    try {
      // เรียก API สำหรับ LINE Notify และ Google Sheet พร้อมกันโดยใช้ Promise.all
      const notifyPromise = fetch('/api/notify', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });

      const saveToSheetPromise = fetch('/api/saveToSheet', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });

      // รอให้ Promise ทั้งสองอย่างทำงานเสร็จสิ้น
      const [notifyResponse, sheetResponse] = await Promise.all([
        notifyPromise,
        saveToSheetPromise,
      ]);

      // ตรวจสอบว่าสำเร็จทั้งคู่หรือไม่
      if (!notifyResponse.ok || !sheetResponse.ok) {
        const notifyError = !notifyResponse.ok ? await notifyResponse.text() : null;
        const sheetError = !sheetResponse.ok ? await sheetResponse.text() : null;
        console.error("Submission failed.", { notifyError, sheetError });
        throw new Error('An error occurred during submission.');
      }

      console.log('Form submitted successfully:', formData);
      // เปลี่ยน State เพื่อแสดงหน้า "ลงทะเบียนสำเร็จ"
      setIsSubmitted(true);

    } catch (err) {
      console.error('Submission error:', err);
      setError('เกิดข้อผิดพลาดในการลงทะเบียน กรุณาลองใหม่อีกครั้ง');
    } finally {
      setIsLoading(false);
    }
  };

  /**
   * รีเซ็ตฟอร์มทั้งหมดกลับไปค่าเริ่มต้น และกลับไปยังหน้าลงทะเบียน
   */
  const handleResetAndGoBack = () => {
    setIsSubmitted(false);
    setFormData(initialFormData);
    setSelectedDateTime(null);
    setHasConsented(false);
  };

  return (
    <div className={styles.pageWrapper}>
      {/* แสดง Modal ที่อยู่เมื่อ isModalOpen เป็น true */}
      {isModalOpen && <AddressModal onClose={() => setIsModalOpen(false)} />}
      {/* ใช้ Conditional Rendering เพื่อสลับระหว่างหน้า "ลงทะเบียนสำเร็จ" กับ "ฟอร์มลงทะเบียน" */}
      {isSubmitted ? (
        <div className={styles.submittedContainer}>
          <div className={styles.card}> {/* --- Start: Submitted Success View --- */}
            <div className={styles.successIconWrapper}>
              <svg width="48" height="48" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
              </svg>
            </div>
            <h2 className={styles.mainTitle}>ลงทะเบียนสำเร็จ!</h2>
            <p className={styles.paragraph}>
              การนัดหมายของคุณได้รับการบันทึกเรียบร้อยแล้ว
              <br />
              เจ้าหน้าที่ได้รับการแจ้งเตือนผ่านทาง Line เรียบร้อยแล้ว
              และข้อมูลถูกบันทึกลงในระบบแล้วค่ะ
            </p>

            {/* ส่วนสรุปข้อมูลการนัดหมาย */}
            <div className={styles.summaryBox}>
                <h3 className={styles.summaryTitle}>สรุปข้อมูลการนัดหมาย</h3>
                <p><strong>ชื่อ-นามสกุล:</strong> {formData.firstName} {formData.lastName}</p>
                <p><strong>ประเภทบริการ:</strong> {formData.service}</p>
                {selectedDateTime && (
                    <p>
                        <strong>วันและเวลานัดหมาย:</strong> 
                        {' '}{selectedDateTime.toLocaleDateString('th-TH', {
                            year: 'numeric', month: 'long', day: 'numeric', hour: '2-digit', minute: '2-digit'
                        , timeZone: 'Asia/Bangkok'
                        })} น.
                    </p>
                )}
            </div>

            {/* ปุ่ม Actions หลังจากลงทะเบียนสำเร็จ */}
            <div className={styles.submittedActions}>
              <button
                onClick={handleResetAndGoBack}
                className={`${styles.button} ${styles.buttonPrimary}`}
              >
                กลับไปที่หน้าลงทะเบียน
              </button>
              <a href="https://maps.app.goo.gl/476B9SRvUWvMctSm7" target="_blank" rel="noopener noreferrer" className={styles.fullWidthLink}>
                <button className={`${styles.button} ${styles.buttonRedTonal}`}>
                  เปิด Google Maps
                </button>
              </a>
            </div>
          </div> {/* --- End: Submitted Success View --- */}
        </div>
      ) : (
        <div className={styles.formAndInfoWrapper}> {/* --- Start: Registration Form View --- */}
          <div className={styles.card}>
            <div className={styles.cardHeader}>
              <h1 className={styles.mainTitle}>ลงทะเบียนการนัดหมาย</h1>
              <p className={styles.subTitle}>กรุณากรอกข้อมูลของคุณเพื่อจองการนัดหมาย</p>
            </div>

            {error && (
              // แสดงกล่องข้อผิดพลาดเมื่อมีค่าใน state 'error'
              <div className={styles.errorBox} role="alert">
                <span>{error}</span>
              </div>
            )}

            <form onSubmit={handleSubmit}>
              {/* ส่วนของฟอร์มกรอกข้อมูล */}
              <div className={styles.formGrid}>
                <div className={styles.formField}>
                  <label htmlFor="firstName" className={styles.label}>ชื่อ<span className={styles.requiredMark}>*</span></label>
                  <input
                    type="text"
                    id="firstName"
                    name="firstName"
                    value={formData.firstName}
                    onChange={handleInputChange}
                    placeholder="กรุณากรอกชื่อ"
                    disabled={isLoading}
                    className={styles.input}
                    required
                  />
                </div>
                <div className={styles.formField}>
                  <label htmlFor="lastName" className={styles.label}>นามสกุล<span className={styles.requiredMark}>*</span></label>
                  <input
                    type="text"
                    id="lastName"
                    name="lastName"
                    value={formData.lastName}
                    onChange={handleInputChange}
                    placeholder="กรุณากรอกนามสกุล"
                    disabled={isLoading}
                    className={styles.input}
                    required
                  />
                </div>
                <div className={`${styles.formField} ${styles.colSpan2}`}>
                  <label htmlFor="phone" className={styles.label}>เบอร์โทรศัพท์<span className={styles.requiredMark}>*</span></label>
                <input
                  type="tel"
                  id="phone"
                  name="phone"
                  value={formData.phone}
                  onChange={handleInputChange}
                  placeholder="0XX-XXX-XXXX"
                  disabled={isLoading}
                  className={styles.input}
                  required
                />
              </div>
                <div className={`${styles.formField} ${styles.colSpan2}`}>
                  <label htmlFor="nationalId" className={styles.label}>เลขบัตรประชาชน<span className={styles.requiredMark}>*</span></label>
                <input
                  type="text"
                  id="nationalId"
                  name="nationalId"
                  value={formData.nationalId}
                  onChange={handleInputChange}
                  placeholder="กรุณากรอกเลขบัตรประชาชน 13 หลัก"
                  maxLength="13"
                  pattern="\d{13}"
                  disabled={isLoading}
                  className={styles.input}
                  required
                />
              </div>
                {/* DatePicker สำหรับเลือกวันและเวลานัดหมาย */}
                <div className={`${styles.formField} ${styles.colSpan2}`}>
                  <label htmlFor="appointmentDateTime" className={styles.label}>วันและเวลานัดหมาย<span className={styles.requiredMark}>*</span></label>
                  <DatePicker
                    id="appointmentDateTime"
                    selected={selectedDateTime}
                    onChange={handleDateChange}
                    locale="th"
                    showTimeSelect
                    minDate={new Date()}
                    filterDate={(date) => date.getDay() !== 0 && date.getDay() !== 6} // ปิดใช้งานวันเสาร์-อาทิตย์
                    // กำหนดช่วงเวลาที่เลือกได้ตามประเภทบริการ
                    minTime={formData.service === 'พัฒนาการเด็ก'
                      ? new Date(new Date().setHours(13, 0, 0, 0))
                      : new Date(new Date().setHours(9, 0, 0, 0))}
                    maxTime={formData.service === 'พัฒนาการเด็ก'
                      ? new Date(new Date().setHours(15, 30, 0, 0))
                      : new Date(new Date().setHours(11, 30, 0, 0))}
                    timeIntervals={30}
                    dateFormat="dd MMMM yyyy, HH:mm น."
                    placeholderText="กรุณาเลือกวันและเวลา"
                    disabled={isLoading}
                    className={styles.input}
                    required
                  />
                </div>
                <div className={`${styles.formField} ${styles.colSpan2}`}>
                  <label htmlFor="service" className={styles.label}>ประเภทบริการ<span className={styles.requiredMark}>*</span></label>
                <select
                  id="service"
                  name="service"
                  value={formData.service}
                  onChange={handleInputChange}
                  disabled={isLoading}
                  className={styles.input}
                  required
                >
                  <option value="">กรุณาเลือกประเภทบริการ</option>
                  <option value="ฝากครรภ์">ฝากครรภ์</option>
                  <option value="วางแผนครอบครัว">วางแผนครอบครัว</option>
                  <option value="พัฒนาการเด็ก">พัฒนาการเด็ก</option>

                </select>
              </div>
                <div className={`${styles.formField} ${styles.colSpan2}`}>
                  <label htmlFor="notes" className={styles.label}>หมายเหตุเพิ่มเติม</label>
                <textarea
                  id="notes"
                  name="notes"
                  value={formData.notes}
                  onChange={handleInputChange}
                  placeholder="กรุณากรอกข้อมูลเพิ่มเติม (ถ้ามี)"
                  rows={4}
                  disabled={isLoading}
                  className={styles.textarea}
                />
              </div>
              </div>

              {/* ส่วนของการยอมรับนโยบายความเป็นส่วนตัว */}
              <div className={styles.consentWrapper}>
                <div className={styles.checkboxContainer}>
                  <input
                    id="consent"
                    name="consent"
                    type="checkbox"
                    checked={hasConsented}
                    onChange={(e) => setHasConsented(e.target.checked)}
                    disabled={isLoading}
                    className={styles.checkbox}
                    required
                  />
                </div>
                <div className={styles.consentLabelWrapper}>
                  <label htmlFor="consent" className={styles.consentLabel}>
                    ข้าพเจ้ายืนยันว่าได้อ่านและยอมรับข้อตกลงตาม <a href="/PrivacyPolicy" className={styles.privacyLink}>นโยบายความเป็นส่วนตัว (Privacy Policy)</a>
                  </label>
                </div>
              </div>

              {/* ปุ่มสำหรับส่งฟอร์ม */}
              <div className={styles.submitButtonWrapper}>
                <button
                  type="submit"
                  className={`${styles.button} ${styles.buttonPrimary} ${styles.submitButton}`}
                  disabled={isLoading || !hasConsented}>
                  {/* แสดง Spinner และข้อความ "กำลังบันทึก" เมื่อ isLoading เป็น true */}
                  {isLoading ? (
                    <span className={styles.loadingSpinner}>
                      <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                        <circle cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                        <path fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                      </svg>
                      กำลังบันทึกข้อมูล...
                    </span>
                  ) : 'ลงทะเบียนการนัดหมาย'}
                </button>
              </div>

              <p className={styles.requiredNote}>
                <span className={styles.requiredMark}>*</span> ข้อมูลที่จำเป็นต้องกรอก
              </p>
            </form>
          </div>
          {/* การ์ดแสดงข้อมูลสิทธิการรักษา */}
          <div className={styles.card}>
            <h2 className={styles.sectionTitle}>สิทธิการรักษาที่สามารถใช้บริการได้</h2>
            <div className={styles.tableWrapper}>
                <table className={styles.infoTable}>
                    <thead className={styles.tableHead}>
                        <tr>
                            <th>สิทธิการรักษา</th>
                            <th>รายละเอียด</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <td data-label="สิทธิการรักษา">สิทธิบัตรทอง (สปสช.)</td>
                            <td data-label="รายละเอียด">ใช้บริการฝากครรภ์และบริการที่เกี่ยวข้องได้ตามชุดสิทธิประโยชน์ โดยไม่มีค่าใช้จ่าย</td>
                        </tr>
                        <tr>
                            <td data-label="สิทธิการรักษา">สิทธิประกันสังคม</td>
                            <td data-label="รายละเอียด">ครอบคลุมค่าฝากครรภ์และค่าคลอดบุตรตามวงเงินที่กำหนด</td>
                        </tr>
                        <tr>
                            <td data-label="สิทธิการรักษา">สิทธิข้าราชการ</td>
                            <td data-label="รายละเอียด">เบิกค่าฝากครรภ์และค่ารักษาพยาบาลได้ตามระเบียบ</td>
                        </tr>
                        <tr>
                            <td data-label="สิทธิการรักษา">ชำระเงินเอง</td>
                            <td data-label="รายละเอียด">สำหรับผู้ที่ไม่มีสิทธิดังกล่าว หรือต้องการรับบริการเพิ่มเติม</td>
                        </tr>
                    </tbody>
                </table>
            </div>
            <p className={styles.tableNote}>*กรุณาตรวจสอบสิทธิของท่านกับเจ้าหน้าที่ก่อนเข้ารับบริการเพื่อความถูกต้อง</p>
          </div>
          <div className={styles.card}>
            <iframe
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3825.9445557770673!2d99.52565277496404!3d16.478344884261983!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x30de186b88443659%3A0x8a986d2f46f070b1!2z4LmC4Lij4LiH4Lie4Lii4Liy4Lia4Liy4Lil4LiK4Li44Lih4LiK4LiZIOC5gOC4l-C4qOC4muC4suC4peC5gOC4oeC4t-C4reC4h-C4geC4s-C5geC4nuC4h-C5gOC4nuC4iuC4ow!5e0!3m2!1sth!2sth!4v1757754410797!5m2!1sth!2sth"
              width="100%"
              height="450"
              className={styles.mapFrame}
              style={{ border: 0 }}
              allowFullScreen=""
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              title="แผนที่โรงพยาบาลชุมชนเทศบาลเมืองกำแพงเพชร"
            ></iframe>
            <div className={styles.mapActions}>
                <button
                    type="button"
                    onClick={() => setIsModalOpen(true)}
                    className={styles.mapButton}
                >
                    ดูที่อยู่และเส้นทาง
                </button>
            </div>
          </div>
        </div> // --- End: Registration Form View ---
      )}
    </div>
  );
}

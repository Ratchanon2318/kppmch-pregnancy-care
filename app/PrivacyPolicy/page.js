import styles from './page.module.css';

/**
 * =====================================================================
 * Privacy Policy Page Component
 * =====================================================================
 * นี่คือคอมโพเนนต์สำหรับแสดงผลหน้า "นโยบายความเป็นส่วนตัว"
 * - เป็น Server Component ที่แสดงเนื้อหาแบบคงที่ (Static Content)
 * - ใช้ CSS Modules (`./page.module.css`) ในการจัดสไตล์เพื่อไม่ให้กระทบกับส่วนอื่นๆ ของเว็บ
 */
export default function Page() {
  return (
    // .pageWrapper: Container หลักของหน้า ใช้สำหรับกำหนดพื้นหลังและ padding โดยรวม
    <div className={styles.pageWrapper}>
      {/* .contentContainer: กล่องสีขาวสำหรับใส่เนื้อหาหลัก จัดให้อยู่กึ่งกลางและมีเงา */}
      <div className={styles.contentContainer}>
        {/* .mainTitle: หัวข้อหลักของหน้า */}
        <h1 className={styles.mainTitle}>
          นโยบายความเป็นส่วนตัว (Privacy Policy)
        </h1>
        {/* .lastUpdated: แสดงวันที่ปรับปรุงล่าสุด */}
        <p className={styles.lastUpdated}>
          อัปเดตล่าสุด: 23/8/2568
        </p>

        {/* === Section 1: บทนำ === */}
        <p className={styles.paragraph}>
          โรงพยาบาลชุมชนเทศบาลเมืองกำแพงเพชร ("เรา", "พวกเรา", หรือ "ของเรา")
          เป็นผู้ดำเนินการเว็บไซต์ งงานส่งเสริมสุขภาพแม่และเด็ก | โรงพยาบาลชุมชนเทศบาลเมืองกำแพงเพชร 
          (เว็บไซต์เพื่อสตรีมีครรภ์) ("บริการ")
          หน้านี้จะแจ้งให้คุณทราบถึงนโยบายของเราเกี่ยวกับการรวบรวม การใช้
          และการเปิดเผยข้อมูลส่วนบุคคลเมื่อคุณใช้บริการของเรา
          และทางเลือกที่คุณมีเกี่ยวกับข้อมูลนั้น
        </p>

        {/* === Section 2: การรวบรวมและใช้ข้อมูล === */}
        <h2 className={styles.sectionTitle}>
          การรวบรวมและใช้ข้อมูล (Information Collection and Use)
        </h2>
        <p className={styles.paragraph}>
          เรารวบรวมข้อมูลหลายประเภทเพื่อวัตถุประสงค์ต่างๆ
          ในการให้บริการและปรับปรุงบริการของเราให้ดียิ่งขึ้น
        </p>

        <h3 className={styles.subSectionTitle}>
          ประเภทของข้อมูลที่จัดเก็บ (Types of Data Collected)
        </h3>

        <h4 className={styles.tertiaryTitle}>
          ข้อมูลส่วนบุคคล (Personal Data)
        </h4>
        <p className={styles.paragraph}>
          ในขณะที่ใช้บริการของเรา
          เราอาจขอให้คุณให้ข้อมูลที่สามารถระบุตัวตนได้ซึ่งสามารถใช้ในการติดต่อหรือระบุตัวตนของคุณ
          ("ข้อมูลส่วนบุคคล")
          ข้อมูลที่สามารถระบุตัวตนได้อาจรวมถึง แต่ไม่จำกัดเพียง:
        </p>
        <ul className={styles.list}>
          <li className={styles.listItem}>ที่อยู่อีเมล</li>
          <li className={styles.listItem}>ชื่อและนามสกุล</li>
          <li className={styles.listItem}>หมายเลขโทรศัพท์</li>
          <li className={styles.listItem}>คุกกี้และข้อมูลการใช้งาน</li>
        </ul>

        <h4 className={styles.tertiaryTitle}>
          ข้อมูลการใช้งาน (Usage Data)
        </h4>
        <p className={styles.paragraph}>
          เราอาจรวบรวมข้อมูลเกี่ยวกับวิธีการเข้าถึงและใช้บริการ
          ("ข้อมูลการใช้งาน")
          ข้อมูลการใช้งานนี้อาจรวมถึงข้อมูลต่างๆ เช่น ที่อยู่ Internet Protocol
          ของคอมพิวเตอร์ของคุณ (เช่น ที่อยู่ IP), ประเภทเบราว์เซอร์,
          เวอร์ชันเบราว์เซอร์, หน้าต่างๆ
          ของบริการของเราที่คุณเยี่ยมชม, เวลาและวันที่คุณเยี่ยมชม,
          เวลาที่ใช้ในหน้าเหล่านั้น, ตัวระบุอุปกรณ์ที่ไม่ซ้ำกัน
          และข้อมูลการวินิจฉัยอื่นๆ
        </p>

        {/* === Section 3: การใช้ข้อมูล === */}
        <h2 className={styles.sectionTitle}>
          การใช้ข้อมูล (Use of Data)
        </h2>
        <p className={styles.paragraph}>
          โรงพยาบาลชุมชนเทศบาลเมืองกำแพงเพชร
          ใช้ข้อมูลที่รวบรวมเพื่อวัตถุประสงค์ต่างๆ:
        </p>
        <ul className={styles.list}>
          <li className={styles.listItem}>เพื่อจัดหาและบำรุงรักษาบริการของเรา</li>
          <li className={styles.listItem}>เพื่อแจ้งให้คุณทราบเกี่ยวกับการเปลี่ยนแปลงบริการของเรา</li>
          <li className={styles.listItem}>
            เพื่อให้คุณสามารถมีส่วนร่วมในคุณลักษณะเชิงโต้ตอบของบริการของเราเมื่อคุณเลือกที่จะทำเช่นนั้น
          </li>
          <li className={styles.listItem}>เพื่อให้การสนับสนุนลูกค้า</li>
          <li className={styles.listItem}>
            เพื่อรวบรวมการวิเคราะห์หรือข้อมูลที่มีค่าเพื่อให้เราสามารถปรับปรุงบริการของเราได้
          </li>
          <li className={styles.listItem}>เพื่อตรวจสอบการใช้งานบริการของเรา</li>
          <li className={styles.listItem}>เพื่อตรวจจับ ป้องกัน และแก้ไขปัญหาทางเทคนิค</li>
        </ul>

        {/* === Section 4: การเปิดเผยข้อมูล === */}
        <h2 className={styles.sectionTitle}>
          การเปิดเผยข้อมูล (Disclosure of Data)
        </h2>
        <p className={styles.paragraph}>
          เราอาจเปิดเผยข้อมูลส่วนบุคคลของคุณโดยเชื่อโดยสุจริตว่าการกระทำดังกล่าวมีความจำเป็นเพื่อ:
        </p>
        <ul className={styles.list}>
          <li className={styles.listItem}>เพื่อปฏิบัติตามภาระผูกพันทางกฎหมาย</li>
          <li className={styles.listItem}>
            เพื่อปกป้องและปกป้องสิทธิ์หรือทรัพย์สินของโรงพยาบาลชุมชนเทศบาลเมืองกำแพงเพชร
          </li>
          <li className={styles.listItem}>
            เพื่อป้องกันหรือตรวจสอบการกระทำผิดที่อาจเกิดขึ้นซึ่งเกี่ยวข้องกับบริการ
          </li>
          <li className={styles.listItem}>
            เพื่อปกป้องความปลอดภัยส่วนบุคคลของผู้ใช้บริการหรือสาธารณะ
          </li>
          <li className={styles.listItem}>เพื่อป้องกันความรับผิดทางกฎหมาย</li>
        </ul>

        {/* === Section 5: ความปลอดภัยของข้อมูล === */}
        <h2 className={styles.sectionTitle}>
          ความปลอดภัยของข้อมูล (Security of Data)
        </h2>
        <p className={styles.paragraph}>
          ความปลอดภัยของข้อมูลของคุณมีความสำคัญต่อเรา
          แต่โปรดจำไว้ว่าไม่มีวิธีการส่งข้อมูลทางอินเทอร์เน็ตหรือวิธีการจัดเก็บข้อมูลอิเล็กทรอนิกส์ใดที่ปลอดภัย
          100% ในขณะที่เราพยายามใช้วิธีการที่ยอมรับได้ในเชิงพาณิชย์เพื่อปกป้องข้อมูลส่วนบุคคลของคุณ
          เราไม่สามารถรับประกันความปลอดภัยได้อย่างสมบูรณ์
        </p>

        {/* === Section 6: การเปลี่ยนแปลงนโยบาย === */}
        <h2 className={styles.sectionTitle}>
          การเปลี่ยนแปลงนโยบายความเป็นส่วนตัวนี้ (Changes to This Privacy
          Policy)
        </h2>
        <p className={styles.paragraph}>
          เราอาจปรับปรุงนโยบายความเป็นส่วนตัวของเราเป็นครั้งคราว
          เราจะแจ้งให้คุณทราบถึงการเปลี่ยนแปลงใดๆ
          โดยการโพสต์นโยบายความเป็นส่วนตัวใหม่ในหน้านี้
          ขอแนะนำให้คุณตรวจสอบนโยบายความเป็นส่วนตัวนี้เป็นระยะๆ
          สำหรับการเปลี่ยนแปลงใดๆ
          การเปลี่ยนแปลงนโยบายความเป็นส่วนตัวนี้จะมีผลเมื่อมีการโพสต์ในหน้านี้
        </p>

        {/* === Section 7: ติดต่อเรา === */}
        <h2 className={styles.sectionTitle}>
          ติดต่อเรา (Contact Us)
        </h2>
        <p className={styles.paragraph}>
          หากคุณมีคำถามใดๆ เกี่ยวกับนโยบายความเป็นส่วนตัวนี้ โปรดติดต่อเรา:
        </p>
        <ul className={styles.list}>
          <li className={styles.listItem}>
            ทางโทรศัพท์ : <a href="tel:055716715" className={styles.contactLink}>055-716-715</a>
          </li>
        </ul>
      </div>
    </div>
  );
}
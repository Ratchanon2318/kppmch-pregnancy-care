import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import styles from './Footer.module.css';
import { FaFacebook, FaLine } from 'react-icons/fa';

/**
 * =====================================================================
 * FOOTER COMPONENT
 * =====================================================================
 * คอมโพเนนต์สำหรับแสดงส่วนท้าย (Footer) ของเว็บไซต์
 * - แสดงข้อมูลโลโก้, ลิงก์ที่สำคัญ, และช่องทางการติดต่อ
 * - คำนวณปี พ.ศ. ปัจจุบันสำหรับแสดงลิขสิทธิ์
 */
const Footer = () => {
  // คำนวณปีปัจจุบัน
  const currentYear = new Date().getFullYear();
  // แปลงเป็นปีพุทธศักราช
  const buddhistYear = currentYear + 543;

  return (
    <footer className={styles.footer}>
      <div className={styles.footerContainer}>
        <div className={styles.footerGrid}>
          {/* === Column 1: Logo & Brand Info === */}
          <div className={styles.footerColumn}>
            <Link href="/" className={styles.footerLogoContainer}>
              <Image src="/logo.jpg" alt="Logo" width={40} height={40} />
              <div className={styles.footerLogoTextContainer}>
                <span className={styles.footerLogoMainText}>งานส่งเสริมสุขภาพแม่และเด็ก</span>
                <span className={styles.footerLogoSubText}>รพช. เมืองกำแพงเพชร</span>
              </div>
            </Link>
          </div>

          {/* === Column 2: Legal & Additional Links === */}
          <div className={styles.footerColumn}>
            <h3 className={styles.legalLinksTitle}>ข้อมูลเพิ่มเติม</h3>
            <ul className={styles.legalLinksList}>
              <li><Link href="/TermsOfService" className={styles.footerLink}>ข้อกำหนดการให้บริการ</Link></li>
              <li><Link href="/PrivacyPolicy" className={styles.footerLink}>นโยบายความเป็นส่วนตัว</Link></li>
            </ul>
          </div>

          {/* === Column 3: Our Works === */}
          <div className={styles.footerColumn}>
            <h3 className={styles.legalLinksTitle}>ผลงาน</h3>
            <ul className={styles.legalLinksList}>
              <li><a href="https://www.facebook.com/share/p/1E5vAR8ym3/" target="_blank" rel="noopener noreferrer" className={styles.footerLink}>ติดตามหญิงตั้งครรภ์ในเขตเทศบาลเมืองกำแพงเพชร</a></li>
            </ul>
              <ul className={styles.legalLinksList}>
              <li><a href="https://www.facebook.com/share/p/18dLhcvQdW/" target="_blank" rel="noopener noreferrer" className={styles.footerLink}>คัดกรองพัฒนาการเด็กปฐมวัย</a></li>
            </ul>
          </div>

          {/* === Column 4: Social Media === */}
          <div className={styles.footerColumn}>
            <h3 className={styles.legalLinksTitle}>ติดตามเรา</h3>
            <div className={styles.socialLinks}>
              <a href="https://www.facebook.com/KPPMCH" target="_blank" rel="noopener noreferrer" className={styles.socialLink} aria-label="Facebook"><FaFacebook size={24} /></a>
              <a href="https://lin.ee/fFCsgz5" target="_blank" rel="noopener noreferrer" className={styles.socialLink} aria-label="Line"><FaLine size={24} /></a>
            </div>
          </div>
        </div>

        {/* === Copyright Section === */}
        <div className={styles.copyright}>
          © {buddhistYear} งานส่งเสริมสุขภาพแม่และเด็ก รพช. เมืองกำแพงเพชร. สงวนลิขสิทธิ์.
        </div>
      </div>
    </footer>
  );
};

export default Footer;
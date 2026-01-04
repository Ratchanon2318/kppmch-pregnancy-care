'use client';

import Image from 'next/image';
import { useState, useEffect } from 'react';
import { FiX } from 'react-icons/fi';
import { FaLine } from 'react-icons/fa';
import styles from './LineSidebar.module.css';

/**
 * =====================================================================
 * LINE SIDEBAR / BANNER COMPONENT
 * =====================================================================
 * คอมโพเนนต์สำหรับแสดงป้ายโฆษณาเพื่อเพิ่มเพื่อนใน LINE
 * - บน Mobile: แสดงเป็น Banner ด้านล่างของจอ
 * - บน Desktop: แสดงเป็น Sidebar ด้านข้าง
 * - สามารถกดปิดได้ และจะแสดงผลหลังจากดีเลย์เล็กน้อยเพื่อไม่ให้รบกวนผู้ใช้
 */
const LineSidebar = () => {
  // State สำหรับจัดการการแสดงผลของป้าย
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    // หน่วงเวลาการแสดงผลของป้ายเล็กน้อย เพื่อไม่ให้รบกวนผู้ใช้ทันทีที่เข้าเว็บ
    const timer = setTimeout(() => {
      setIsVisible(true);
    }, 1500);
    // Cleanup function: ยกเลิก timer เมื่อ component ถูก unmount
    return () => clearTimeout(timer);
  }, []);

  if (!isVisible) {
    return null;
  }

  return (
    <aside>
      {/* === Mobile Banner (แสดงเฉพาะบนจอมือถือ) === */}
      <div className={styles.mobileBanner}>
        <div className={styles.lineBannerContent}>
          <FaLine className={styles.lineBannerIcon} />
          <div className={styles.lineBannerText}>
            <p className={styles.lineBannerTitle}>เพิ่มเพื่อนใน LINE</p>
          </div>
          <a href="https://lin.ee/fFCsgz5" target="_blank" rel="noopener noreferrer">
            <button className={styles.lineBannerButton}>
              เพิ่มเพื่อนเลย
            </button>
          </a>
          <button onClick={() => setIsVisible(false)} className={styles.lineBannerClose} aria-label="Close banner">
            <FiX size={20} />
          </button>
        </div>
      </div>

      {/* === Desktop Sidebar (แสดงเฉพาะบนจอ Desktop) === */}
      <div className={styles.desktopSidebar}>
        <button onClick={() => setIsVisible(false)} className={styles.sidebarCloseButton} aria-label="Close sidebar">
          <FiX size={24} />
        </button>
        <h3 className={styles.sidebarTitle}>เพิ่มเพื่อนใน LINE</h3>
        <p className={styles.sidebarText}>
          เพื่อรับข้อมูลข่าวสาร และปรึกษาปัญหาสุขภาพกับเราได้โดยตรง
        </p>
        <Image src="/qrcode.png" width={180} height={180} alt="QR Code สำหรับเพิ่มเพื่อนใน LINE" className={styles.sidebarQrImage} />
        <a href="https://lin.ee/fFCsgz5" target="_blank" rel="noopener noreferrer">
          <button className={styles.sidebarButton}>
            <FaLine style={{ height: '1.5rem', width: '1.5rem' }} />
            เพิ่มเพื่อนเลย
          </button>
        </a>
      </div>
    </aside>
  );
};

export default LineSidebar;
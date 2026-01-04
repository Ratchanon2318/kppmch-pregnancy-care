'use client';

import React, { useState, useEffect } from 'react';
import styles from './BackToTopButton.module.css';

/**
 * =====================================================================
 * BACK TO TOP BUTTON COMPONENT
 * =====================================================================
 * คอมโพเนนต์สำหรับแสดงปุ่ม "กลับไปข้างบน"
 * - ปุ่มจะปรากฏขึ้นเมื่อผู้ใช้เลื่อนหน้าจอลงมาถึงจุดที่กำหนด
 * - เมื่อคลิก, หน้าจอจะเลื่อนกลับไปด้านบนสุดอย่างนุ่มนวล
 */
export default function BackToTopButton() {
  // State สำหรับจัดการการแสดงผลของปุ่ม
  const [isVisible, setIsVisible] = useState(false);

  // Function ที่จะถูกเรียกเมื่อมีการเลื่อนหน้าจอ
  // ตรวจสอบตำแหน่ง scrollY ถ้ามากกว่า 300px จะแสดงปุ่ม
  const toggleVisibility = () => {
    if (window.scrollY > 300) { // Show button after scrolling 300px
      setIsVisible(true);
    } else {
      setIsVisible(false);
    }
  };

  // Function สำหรับเลื่อนหน้าจอกลับไปด้านบนสุด
  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth' // For a smooth scrolling experience
    });
  };

  // Hook ที่จะทำงานครั้งเดียวเมื่อ component ถูก mount
  // ใช้สำหรับเพิ่มและลบ event listener สำหรับการ scroll
  useEffect(() => {
    // เพิ่ม event listener เมื่อ component ถูกสร้าง
    window.addEventListener('scroll', toggleVisibility);

    // Cleanup function: จะถูกเรียกเมื่อ component ถูก unmount
    // ใช้สำหรับลบ event listener เพื่อป้องกัน memory leak
    return () => {
      window.removeEventListener('scroll', toggleVisibility);
    };
  }, []);

  return (
    <div className={styles.backToTopContainer}>
      {/* แสดงปุ่มก็ต่อเมื่อ isVisible เป็น true */}
      {isVisible && (
        <button
          onClick={scrollToTop}
          className={styles.backToTopButton}
          aria-label="กลับไปข้างบน"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className={styles.icon}
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="3"
              d="M4.5 15.75l7.5-7.5 7.5 7.5"
            />
          </svg>
        </button>
      )}
    </div>
  );
}

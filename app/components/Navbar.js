'use client';

import Link from 'next/link';
import Image from 'next/image';
import { useState, useEffect } from 'react';
import { usePathname } from 'next/navigation';
import styles from './Navbar.module.css';

/**
 * =====================================================================
 * NAVIGATION ITEMS
 * =====================================================================
 * อาร์เรย์ของออบเจ็กต์ที่ใช้สร้างรายการเมนูใน Navbar
 */
const navItems = [
    { href: '/#when-to-start', label: 'ฝากครรภ์เมื่อไหร่' },
    { href: '/#services-table', label: 'ตารางบริการ' },
    { href: '/#timeline', label: 'เส้นทางการตั้งครรภ์' },
   
    { href: '/#team', label: 'ทีมงาน' },
    { href: '/#faq', label: 'คำถามที่พบบ่อย' },
     { href: '/#about-us', label: 'เกี่ยวกับเรา' },
    { href: '/#contact', label: 'ติดต่อเรา' },
    
    { href: '/PregnancyAppointmentSchedule', label: 'ลงทะเบียนนัดหมาย' },
];

/**
 * =====================================================================
 * NAVBAR COMPONENT
 * =====================================================================
 * คอมโพเนนต์สำหรับแสดงแถบเมนูนำทาง (Navigation Bar) ด้านบนของเว็บไซต์
 * - รองรับการแสดงผลทั้งบน Desktop และ Mobile (Hamburger Menu)
 * - มีฟังก์ชันสำหรับเลื่อนไปยัง Section ต่างๆ ในหน้าแรกอย่างนุ่มนวล (Smooth Scroll)
 */
const Navbar = () => {
    // State สำหรับจัดการการเปิด/ปิดเมนูบนมือถือ
    const [isNavOpen, setIsNavOpen] = useState(false);
    // Hook สำหรับเข้าถึง path ของ URL ปัจจุบัน
    const pathname = usePathname();

    // Function สำหรับสลับการแสดงผล (toggle) ของเมนูบนมือถือ
    const toggleNav = () => {
        setIsNavOpen(!isNavOpen);
    };

    // Hook ที่จะทำงานเมื่อ `pathname` เปลี่ยนแปลง (เมื่อมีการเปลี่ยนหน้า)
    // ใช้สำหรับปิดเมนูบนมือถือโดยอัตโนมัติเมื่อผู้ใช้คลิกที่ลิงก์
    useEffect(() => {
        setIsNavOpen(false);
    }, [pathname]);

    /**
     * Function สำหรับจัดการการเลื่อนไปยัง Section ต่างๆ ในหน้าแรก
     * - ตรวจสอบว่า URL ปัจจุบันคือหน้าแรก (`/`) และลิงก์ที่คลิกเป็น anchor link (`/#...`)
     * - ถ้าใช่, จะป้องกันการโหลดหน้าใหม่ (`e.preventDefault()`)
     * - และใช้ `scrollIntoView` เพื่อเลื่อนไปยัง Section ที่มี ID ตรงกันอย่างนุ่มนวล
     * @param {React.MouseEvent} e - Event object จากการคลิก
     * @param {string} href - URL ของลิงก์ที่ถูกคลิก
     */
    const handleScroll = (e, href) => {
        if (pathname === '/' && href.startsWith('/#')) {
            e.preventDefault();
            const sectionId = href.substring(2);
            document.getElementById(sectionId)?.scrollIntoView({ behavior: 'smooth' });
        }
    };

    return (
        <nav className={styles.navbar}>
            <div className={styles.navContent}>
                    {/* === Logo Section === */}
                    <Link href="/" className={styles.logoContainer}>
                        <Image
                            src="/logo.jpg" // Make sure your logo is in the /public folder
                            alt="HPC Logo"
                            width={40}
                            height={40}
                            className={styles.logoImage}
                        />
                        <div className={styles.logoTextContainer}>
                            <span className={styles.logoMainText}>งานส่งเสริมสุขภาพแม่และเด็ก</span>
                            <span className={styles.logoSubText}>รพช. เมืองกำแพงเพชร</span>
                        </div>
                    </Link>

                    {/* === Desktop Menu (จะถูกซ่อนบนมือถือ) === */}
                    <ul className={styles.navLinks}>
                        {navItems.map((item) => (
                            <li key={item.href}>
                                <Link
                                    href={item.href}
                                    // เรียกใช้ handleScroll เมื่อมีการคลิก
                                    onClick={(e) => handleScroll(e, item.href)}
                                    className={`${styles.navLink} ${
                                        pathname + (typeof window !== 'undefined' ? window.location.hash : '') === item.href ? styles.navLinkActive : ''
                                    }`}
                                >
                                    {item.label}
                                </Link>
                            </li>
                        ))}
                    </ul>

                {/* === Hamburger Menu Button (ปุ่มสำหรับเปิดเมนูบนมือถือ) === */}
                <button onClick={toggleNav} type="button" className={styles.hamburgerButton} aria-label="toggle menu">
                    <svg viewBox="0 0 24 24" className={styles.hamburgerIcon}>
                        {isNavOpen ? (
                            <path fillRule="evenodd" clipRule="evenodd" d="M18.278 16.864a1 1 0 0 1-1.414 1.414l-4.829-4.828-4.828 4.828a1 1 0 0 1-1.414-1.414l4.828-4.829-4.828-4.828a1 1 0 0 1 1.414-1.414l4.829 4.828 4.828-4.828a1 1 0 1 1 1.414 1.414l-4.828 4.829 4.828 4.828z" />
                        ) : (
                            <path fillRule="evenodd" clipRule="evenodd" d="M4 5h16a1 1 0 0 1 0 2H4a1 1 0 1 1 0-2zm0 6h16a1 1 0 0 1 0 2H4a1 1 0 0 1 0-2zm0 6h16a1 1 0 0 1 0 2H4a1 1 0 0 1 0-2z" />
                        )}
                    </svg>
                </button>
            </div>

            {/* === Mobile Menu (เมนูสำหรับแสดงผลบนมือถือ) === */}
            <div className={`${styles.mobileMenu} ${isNavOpen ? styles.open : ''}`}>
                <ul className={styles.mobileNavList}>
                    {navItems.map((item) => (
                        <li key={item.href}>
                            <Link
                                // เรียกใช้ handleScroll เมื่อมีการคลิก
                                href={item.href}
                                    onClick={(e) => handleScroll(e, item.href)}
                                    className={`${styles.mobileNavLink} ${
                                        pathname + (typeof window !== 'undefined' ? window.location.hash : '') === item.href ? styles.mobileNavLinkActive : ''
                                    }`}
                            >
                                {item.label}
                            </Link>
                        </li>
                    ))}
                </ul>
            </div>
        </nav>
    );
};

export default Navbar;
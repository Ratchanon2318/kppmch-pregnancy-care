'use client'

import React, { useState } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { motion } from 'framer-motion'
import styles from './page.module.css'

/**
 * =====================================================================
 * DATA SECTION
 * =====================================================================
 * ส่วนนี้ใช้สำหรับเก็บข้อมูลแบบคงที่ (Static Data) ที่จะนำไปแสดงผลในส่วนต่างๆ ของหน้าเว็บ
 * การแยกข้อมูลออกมาจาก JSX ทำให้โค้ดสะอาดและง่ายต่อการแก้ไขในอนาคต
 */
// ข้อมูลทีมงาน
const teamMembers = [
  {
    name: 'พญ.จริดา สันธิติพงศ์',
    position: 'แพทย์หญิง',
    quote: '“คุณแม่ไม่ต้องกังวลนะคะ เราจะดูแลคุณแม่และลูกน้อยอย่างใส่ใจ”',
    image: '/team/team-1.png',
  },
  {
    name: 'นางสาวมณฑ์ศิริ กล่อมยัง',
    position: 'พยาบาลวิชาชีพชำนาญการ',
    quote: '“คุณแม่เก่งมากค่ะ การเปลี่ยนแปลงทุกอย่างตอนนี้เป็นเรื่องปกติ”',
    image: '/team/team-2.jpg',
  },
  {
    name: 'นางสาวกุลสินี สาพาที',
    position: 'พยาบาลวิชาชีพชำนาญการ',
    quote: '“คุณแม่ไม่ได้อยู่คนเดียวค่ะ ทีมแพทย์และครอบครัวอยู่ข้างๆ คุณแม่เสมอ”',
    image: '/team/team-3.jpg',
  },
]

// ข้อมูลสำหรับ Section "ควรฝากครรภ์เมื่อไหร่"
const whenToStartItems = [
  'ทันทีที่รู้ว่าตั้งครรภ์ หรืออย่างช้าที่สุดภายใน 12 สัปดาห์แรก',
  'การตรวจครั้งแรกมีความสำคัญอย่างยิ่งในการประเมินความเสี่ยง',
  'ช่วยให้ตรวจพบและป้องกันภาวะแทรกซ้อนที่อาจเกิดขึ้นได้',
  'เพื่อให้คุณแม่และทารกในครรภ์ได้รับการดูแลที่ดีที่สุด',
];

// ข้อมูลสำหรับตารางบริการ
const servicesSchedule = [
  {
    day: 'จันทร์',
    morning: {
      service: 'ฝากครรภ์, วางแผนครอบครัว',
      provider: 'พญ.จริดา สันธิติพงศ์',
    },
    afternoon: {
      service: 'พัฒนาการเด็ก',
      provider: 'คุณมณฑ์ศิริ กล่อมยัง, พยาบาลวิชาชีพชำนาญการ',
    },
  },
  {
    day: 'อังคาร',
    morning: {
      service: 'ฝากครรภ์, วางแผนครอบครัว',
      provider: 'พญ.จริดา สันธิติพงศ์',
    },
    afternoon: {
      service: 'พัฒนาการเด็ก',
      provider: 'คุณมณฑ์ศิริ กล่อมยัง, พยาบาลวิชาชีพชำนาญการ',
    },
  },
    {
    day: 'พุธ',
    morning: {
      service: 'ฝากครรภ์, วางแผนครอบครัว',
      provider: 'พญ.จริดา สันธิติพงศ์',
    },
    afternoon: {
      service: 'พัฒนาการเด็ก',
      provider: 'คุณมณฑ์ศิริ กล่อมยัง, พยาบาลวิชาชีพชำนาญการ',
    },
  },
  {
    day: 'พฤหัสบดี',
    morning: {
      service: 'ฝากครรภ์, วางแผนครอบครัว',
      provider: 'พญ.จริดา สันธิติพงศ์',
    },
    afternoon: {
      service: 'พัฒนาการเด็ก',
      provider: 'คุณมณฑ์ศิริ กล่อมยัง, พยาบาลวิชาชีพชำนาญการ',
    },
  },
  {
    day: 'ศุกร์',
    morning: {
      service: 'ฝากครรภ์, วางแผนครอบครัว',
      provider: 'พญ.จริดา สันธิติพงศ์',
    },
    afternoon: {
      service: 'พัฒนาการเด็ก',
      provider: 'คุณมณฑ์ศิริ กล่อมยัง, พยาบาลวิชาชีพชำนาญการ',
    },
  },
  {
    day: 'วันหยุดราชการและวันหยุดสุดสัปดาห์',
    morning: {
      service: 'ปิดทำการ',
      provider: null,
    },
    afternoon: {
      service: 'ปิดทำการ',
      provider: null,
    },
  }
];

// ข้อมูลสำหรับ Timeline การตั้งครรภ์
const pregnancyTimelineData = [
  {
    trimester: 'ไตรมาสที่ 1',
    weeks: 'สัปดาห์ที่ 1-12',
    title: 'ช่วงเวลาแห่งการเริ่มต้น',
    details: [
      'ทารกเริ่มสร้างอวัยวะสำคัญ',
      'คุณแม่อาจมีอาการแพ้ท้อง',
      'ควรเริ่มทานกรดโฟลิกเสริม',
      'พบแพทย์เพื่อฝากครรภ์ครั้งแรก',
    ],
  },
  {
    trimester: 'ไตรมาสที่ 2',
    weeks: 'สัปดาห์ที่ 13-28',
    title: 'ช่วงเวลาที่สบายที่สุด',
    details: [
      'อาการแพ้ท้องลดลง',
      'เริ่มรู้สึกถึงการดิ้นของลูกน้อย',
      'ท้องขยายขนาดเห็นได้ชัดเจน',
      'ตรวจอัลตราซาวด์เพื่อดูพัฒนาการ',
    ],
  },
  {
    trimester: 'ไตรมาสที่ 3',
    weeks: 'สัปดาห์ที่ 29-40',
    title: 'เตรียมพร้อมพบหน้ากัน',
    details: [
      'ทารกเติบโตอย่างรวดเร็ว',
      'คุณแม่อาจรู้สึกอึดอัดและเหนื่อยง่าย',
      'เรียนรู้สัญญาณเตือนการคลอด',
      'เตรียมของใช้สำหรับคุณแม่และลูกน้อย',
    ],
  },
];

// ข้อมูลสำหรับ Section "คำถามที่พบบ่อย" (FAQ)
const faqItems = [
  {
    question: 'ควรเริ่มฝากครรภ์เมื่อไหร่?',
    answer:
      'คุณแม่ควรมาฝากครรภ์โดยเร็วที่สุดเมื่อทราบว่าตั้งครรภ์ หรืออย่างช้าที่สุดไม่ควรเกิน 12 สัปดาห์ เพื่อให้แพทย์ได้ประเมินความเสี่ยงและให้การดูแลที่เหมาะสมตั้งแต่เนิ่นๆ ค่ะ',
  },
  {
    question: 'ต้องเตรียมเอกสารอะไรมาบ้างในการฝากครรภ์ครั้งแรก?',
    answer:
      'กรุณานำบัตรประจำตัวประชาชน, ทะเบียนบ้าน, และสมุดบันทึกสุขภาพ (ถ้ามี) มาด้วยค่ะ หากมีประวัติการรักษาหรือแพ้ยา ควรแจ้งให้เจ้าหน้าที่ทราบด้วยนะคะ',
  },
  {
    question: 'ค่าใช้จ่ายในการฝากครรภ์เท่าไหร่?',
    answer:
      'โรงพยาบาลของเรามีบริการฝากครรภ์ตามสิทธิ์การรักษาพยาบาล เช่น บัตรทอง, ประกันสังคม โดยไม่มีค่าใช้จ่ายเพิ่มเติม ยกเว้นกรณีมีการตรวจพิเศษนอกเหนือจากชุดสิทธิ์ประโยชน์ค่ะ',
  },
  {
    question: 'สามารถฝากครรภ์นอกเวลาราชการได้หรือไม่?',
    answer:
      'ปัจจุบันคลินิกฝากครรภ์ของเราเปิดให้บริการในวันและเวลาราชการเท่านั้นค่ะ หากมีข้อสงสัยเพิ่มเติมเกี่ยวกับการนัดหมาย สามารถติดต่อสอบถามได้ที่เบอร์โทรศัพท์ของโรงพยาบาลค่ะ',
  },
  {
    question: 'หากมีภาวะแทรกซ้อนหรืออาการผิดปกติ ควรทำอย่างไร?',
    answer:
      'หากคุณแม่มีอาการผิดปกติ เช่น ปวดท้องรุนแรง, มีเลือดออก, หรือลูกดิ้นน้อยลง ควรรีบมาพบแพทย์ที่โรงพยาบาลทันทีโดยไม่ต้องรอให้ถึงวันนัดนะคะ',
  },
  {
    question: 'คลินิกมีบริการอะไรบ้างนอกจากการฝากครรภ์?',
    answer:
      'นอกจากการฝากครรภ์แล้ว เรายังมีบริการวางแผนครอบครัว, ตรวจสุขภาพหลังคลอด, และคลินิกสุขภาพเด็กดีเพื่อให้การดูแลที่ต่อเนื่องสำหรับคุณแม่และลูกน้อยค่ะ',
  },
  {
    question: 'การอัลตราซาวด์จำเป็นหรือไม่ และต้องทำกี่ครั้ง?',
    answer:
      'การอัลตราซาวด์เป็นสิ่งจำเป็นเพื่อประเมินการเจริญเติบโตและพัฒนาการของทารก โดยทั่วไปจะทำอย่างน้อย 2 ครั้ง คือในช่วงไตรมาสแรกเพื่อยืนยันอายุครรภ์ และช่วงไตรมาสที่สองเพื่อประเมินความสมบูรณ์ของทารก แพทย์อาจแนะนำให้ทำเพิ่มเติมตามความจำเป็นค่ะ',
  },
  {
    question: 'อาการแบบไหนที่ควรระวังเป็นพิเศษระหว่างตั้งครรภ์?',
    answer:
      'คุณแม่ควรสังเกตอาการต่างๆ เช่น เลือดออกทางช่องคลอด, ปวดท้องรุนแรงต่อเนื่อง, มีไข้สูง, ปวดศีรษะรุนแรงพร้อมตาพร่ามัว, หรือลูกดิ้นน้อยลงผิดปกติ หากมีอาการเหล่านี้ ควรรีบมาพบแพทย์ทันทีค่ะ',
  },
  {
    question: 'หลังคลอดต้องดูแลตัวเองอย่างไรบ้าง?',
    answer:
      'คุณแม่หลังคลอดควรพักผ่อนให้เพียงพอ, รับประทานอาหารที่มีประโยชน์, ดื่มน้ำมากๆ, และดูแลความสะอาดของแผลฝีเย็บหรือแผลผ่าตัดคลอดตามคำแนะนำของแพทย์ และควรมาตรวจหลังคลอดตามนัดเพื่อประเมินสุขภาพของคุณแม่ค่ะ',
  },
];


/**
 * =====================================================================
 * ANIMATION VARIANTS (สำหรับ Framer Motion)
 * =====================================================================
 * `containerVariants` ใช้สำหรับสร้าง animation แบบ stagger (หน่วงเวลา) ให้กับ element ลูก
 * ทำให้ item ที่อยู่ข้างในปรากฏขึ้นทีละชิ้นอย่างสวยงาม
 */
const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
    },
  },
}

/**
 * `itemVariants` ใช้สำหรับ animation ของแต่ละ item ที่อยู่ใน container
 * โดยจะเลื่อนขึ้นเล็กน้อย (y: 20 -> 0) และค่อยๆ ปรากฏขึ้น (opacity: 0 -> 1)
 */
const itemVariants = {
  hidden: { y: 20, opacity: 0 },
  visible: {
    y: 0,
    opacity: 1,
    transition: {
      type: 'spring',
      stiffness: 100,
    },
  },
}

export default function Home() {
  /**
   * =====================================================================
   * COMPONENT STATE
   * =====================================================================
   * State สำหรับจัดการการเปิด/ปิดของรายการ FAQ
   * `openFaqIndex` จะเก็บ index ของคำถามที่กำลังเปิดอยู่
   * ถ้าไม่มีคำถามไหนเปิดอยู่ ค่าจะเป็น `null`
   */
  const [openFaqIndex, setOpenFaqIndex] = useState(null);

  /**
   * Function สำหรับสลับการแสดงผล (toggle) ของคำตอบใน FAQ
   * - ถ้าคลิกคำถามที่ปิดอยู่: จะตั้งค่า index ของคำถามนั้นเป็น `openFaqIndex`
   * - ถ้าคลิกคำถามที่เปิดอยู่แล้ว: จะตั้งค่า `openFaqIndex` เป็น `null` เพื่อปิดคำตอบ
   */
  const handleFaqToggle = (index) => {
    setOpenFaqIndex(openFaqIndex === index ? null : index);
  };

  return (
    <main className={styles.pageMain}>
      {/* === Section: Hero (ส่วนบนสุดของหน้า) === */}
      <section className={styles.heroSection}>
        <div className={`${styles.container} ${styles.heroContainer}`}>
          <motion.div
            className={styles.heroTextWrapper}
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
          >
            <h1 className={styles.heroTitle}>
              เพราะสุขภาพคุณแม่และลูกน้อยสำคัญที่สุด
            </h1>
            <p className={styles.heroDescription}>
             ให้เราได้ดูแลทุกก้าวอย่างใกล้ชิด มาฝากครรภ์กับเราเพื่อความอุ่นใจและปลอดภัยตลอดการเดินทางครั้งนี้นะคะ
            </p>
            <div className={styles.heroButtonContainer}>
              <Link href="/PregnancyAppointmentSchedule" passHref>
                <motion.button
                  className={`${styles.button} ${styles.buttonPrimary}`}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  นัดหมายฝากครรภ์
                </motion.button>
              </Link>
             
            </div>
          </motion.div>
          <motion.div
            className={styles.heroImageWrapper}
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            <Image
              src="/content/hero-image.jpg"
              alt="รูปภาพ นางสาวมณฑ์ษศิริ กล่อมยัง"
              width={500}
              height={500}
              className={styles.heroImage}
              priority
            />
          </motion.div>
        </div>
      </section>

      {/* 
        === Section: ควรฝากครรภ์เมื่อไหร่ (When to Start) ===
        - Section นี้ใช้ layout แบบ `splitSection` ซึ่งจะแสดงรูปภาพและข้อความคู่กันบนจอใหญ่
        - และจะซ่อนรูปภาพ แสดงเฉพาะข้อความบนจอมือถือ
      */}
      <section id="when-to-start" className={`${styles.section} ${styles.sectionRed100}`}>
        <div className={`${styles.container} ${styles.splitSectionContainer}`}>
          <motion.div
            className={styles.splitSectionImageWrapper}
            initial={{ opacity: 0, scale: 0.8 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true, amount: 0.5 }}
            transition={{ duration: 0.6 }}
          >
            <Image
              src="/content/when-to-care.png"
              alt="รูปภาพ หญิงตั้งครรภ์"
              width={500}
              height={500}
              className={styles.sectionImage}
            />
          </motion.div>
          <motion.div
            className={styles.splitSectionTextWrapper}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.3 }}
            variants={containerVariants}
          >
            <h2 className={styles.sectionTitle}>ควรฝากครรภ์เมื่อไหร่?</h2>
            <p className={styles.sectionDescription}>
              การฝากครรภ์โดยเร็วที่สุดเป็นสิ่งสำคัญอย่างยิ่ง
              เพื่อให้แน่ใจว่าทั้งคุณแม่และลูกน้อยในครรภ์จะได้รับการดูแลที่ดีที่สุดตั้งแต่เริ่มต้น
            </p>
            <p className={styles.sectionDescription}>
              คำตอบที่ดีที่สุด: ทันทีที่รู้ว่าตั้งครรภ์
            </p>
            <ul className={styles.whenToStartList}>
              {whenToStartItems.map((item, index) => (
                <motion.li key={index} className={styles.whenToStartListItem} variants={itemVariants}>
                  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className={styles.whenToStartListItemIcon}>
                    <path fillRule="evenodd" d="M2.25 12c0-5.385 4.365-9.75 9.75-9.75s9.75 4.365 9.75 9.75-4.365 9.75-9.75 9.75S2.25 17.385 2.25 12zm13.36-1.814a.75.75 0 10-1.22-.872l-3.236 4.53L9.53 12.22a.75.75 0 00-1.06 1.06l2.25 2.25a.75.75 0 001.14-.094l3.75-5.25z" clipRule="evenodd" />
                  </svg>
                  <span>{item}</span>
                </motion.li>
              ))}
            </ul>
            
          </motion.div>
        </div>
      </section>

      {/* 
        === Section: ตารางบริการ (Services Table) ===
        - แสดงข้อมูลบริการในรูปแบบตารางที่อ่านง่าย
      */}
      <section id="services-table" className={styles.servicesTableSection}>
        <div className={styles.container}>
          <h2 className={styles.sectionTitle}>ตารางการให้บริการ</h2>
          <p className={styles.sectionDescription}>
            เวลาทำการของคลินิกต่างๆ เพื่อให้คุณแม่สามารถวางแผนการเดินทางได้อย่างสะดวก
          </p>
          <motion.div
            className={styles.servicesTableContainer}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.6 }}
          >
            <div className={styles.scheduleTable}>
              <div className={`${styles.scheduleRow} ${styles.scheduleHeader}`}>
                <div className={`${styles.scheduleCell} ${styles.dayCell}`}>วัน</div>
                <div className={`${styles.scheduleCell} ${styles.timeSlotCell}`}>09.00 - 11.30 น.</div>
                <div className={`${styles.scheduleCell} ${styles.timeSlotCell}`}>13.00 - 15.30 น.</div>
              </div>
              <div className={styles.scheduleBody}>
                {servicesSchedule.map((item, index) => (
                  <div key={index} className={styles.scheduleRow}>
                    <div className={`${styles.scheduleCell} ${styles.dayCell}`}>
                      {item.day}
                    </div>
                    <div className={`${styles.scheduleCell} ${styles.timeSlotCell}`} data-label="09.00 - 11.30 น.">
                      <div className={styles.serviceName}>{item.morning.service}</div>
                      {item.morning.provider && (
                        <div className={styles.serviceProvider}>{item.morning.provider}</div>
                      )}
                    </div>
                    <div className={`${styles.scheduleCell} ${styles.timeSlotCell}`} data-label="13.00 - 15.30 น.">
                      <div className={styles.serviceName}>{item.afternoon.service}</div>
                      {item.afternoon.provider && (
                        <div className={styles.serviceProvider}>{item.afternoon.provider}</div>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </motion.div>
          <p className={styles.servicesTableNote}>
            <strong>หมายเหตุ:</strong> บริการฝากครรภ์และบริการพื้นฐานสามารถใช้สิทธิ์การรักษาพยาบาล (เช่น บัตรทอง, ประกันสังคม) ได้โดยไม่มีค่าใช้จ่ายเพิ่มเติม
          </p>
        </div>
      </section>

      {/* 
        === Section: เส้นทางการตั้งครรภ์ (Timeline) ===
        - แสดงข้อมูลการตั้งครรภ์ในแต่ละไตรมาสในรูปแบบ Timeline ที่สวยงาม
      */}
      <section id="timeline" className={styles.timelineSection}>
        <div className={styles.container}>
          <h2 className={styles.sectionTitle}>เส้นทางการตั้งครรภ์ 9 เดือน</h2>
          <p className={styles.sectionDescription}>
            ภาพรวมพัฒนาการของลูกน้อยและสิ่งที่ควรทำในแต่ละไตรมาส
          </p>
          <div className={styles.timelineContainer}>
            {pregnancyTimelineData.map((item, index) => (
              <motion.div
                key={index}
                className={styles.timelineItem}
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.5 }}
                transition={{ duration: 0.5, delay: index * 0.2 }}
              >
                <div className={styles.timelineIcon}></div>
                <div className={styles.timelineContent}>
                  <span className={styles.timelineTrimester}>{item.trimester} ({item.weeks})</span>
                  <h3 className={styles.timelineTitle}>{item.title}</h3>
                  <ul className={styles.timelineDetails}>
                    {item.details.map((detail, i) => (
                      <li key={i}>{detail}</li>
                    ))}
                  </ul>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* 
        === Section: ทีมงาน (Team) ===
        - แสดงข้อมูลทีมแพทย์และพยาบาลเพื่อสร้างความน่าเชื่อถือ
      */}
      <section id="team" className={styles.teamSection}>
        <div className={styles.container}>
          <h2 className={styles.teamSectionTitle}>ทีมงานของเรา</h2>
          <motion.div
            className={styles.teamGrid}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.2 }}
            variants={containerVariants}
          >
            {teamMembers.map((member, index) => (
              <motion.div key={index} className={styles.teamMemberCard} variants={itemVariants}>
                <Image
                  src={member.image}
                  width={128}
                  height={128}
                  alt={`รูปภาพ ${member.name}`}
                  className={styles.teamMemberImage}
                />
                <p className={styles.teamMemberName}>{member.name}</p>
                <p className={styles.teamMemberPosition}>{member.position}</p>
                <p className={styles.teamMemberQuote}>{member.quote}</p>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* 
        === Section: คำถามที่พบบ่อย (FAQ) ===
        - ใช้ State (`openFaqIndex`) และ Function (`handleFaqToggle`) เพื่อควบคุมการแสดงผลแบบ Accordion
        - เมื่อคลิกที่ `<button>`, `handleFaqToggle` จะถูกเรียกเพื่ออัปเดต State
      */}
      <section id="faq" className={styles.faqSection}>
        <div className={styles.container}>
          <h2 className={styles.sectionTitle}>คำถามที่พบบ่อย</h2>
          <p className={styles.sectionDescription}>
            เรารวบรวมคำถามที่พบบ่อยเกี่ยวกับการฝากครรภ์และบริการต่างๆ เพื่อคลายข้อสงสัยให้คุณแม่
          </p>
          <div className={styles.faqContainer}>
            {faqItems.map((faq, index) => (
              <div key={index} className={styles.faqItem}>
                <button className={styles.faqQuestion} onClick={() => handleFaqToggle(index)}>
                  <span className={styles.faqQuestionText}>{faq.question}</span>
                  <div className={styles.faqIcon}>
                    {openFaqIndex === index ? '−' : '+'}
                  </div>
                </button>
                <div
                  // การแสดง/ซ่อนคำตอบจะถูกควบคุมโดยการเพิ่ม/ลบคลาส `styles.open`
                  className={`${styles.faqAnswerWrapper} ${openFaqIndex === index ? styles.open : ''}`}
                >
                  <div className={styles.faqAnswer}>
                    {faq.answer}
                  </div>
                </div>
              </div>
            ))}
          </div>
        
        </div>
      </section>

      {/* 
        === Section: เกี่ยวกับเรา (About Us) ===
        - แสดงข้อมูลเกี่ยวกับพันธกิจและวิสัยทัศน์ของโครงการ
      */}
      <section id="about-us" className={styles.section}>
        <div className={`${styles.container} ${styles.splitSectionContainer} ${styles.aboutUsContainer}`}>
          <motion.div
            className={styles.splitSectionTextWrapper}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.3 }}
            variants={containerVariants}
          >
            <h2 className={styles.sectionTitle}>เกี่ยวกับโครงการของเรา</h2>
            <p className={styles.aboutUsText}>
              โครงการส่งเสริมสุขภาพแม่และเด็กของโรงพยาบาลชุมชนเทศบาลเมืองกำแพงเพชร ถูกจัดตั้งขึ้นโดยมีวัตถุประสงค์หลักเพื่อทำหน้าที่เป็นแหล่งข้อมูลและศูนย์สนับสนุนที่ครบวงจรสำหรับสตรีที่กำลังตั้งครรภ์และครอบครัว
            </p>
           
          
            <p className={styles.aboutUsText}>
              เรามุ่งมั่นในการเป็นแหล่งข้อมูลที่เชื่อถือได้และทันสมัย เพื่อเสริมสร้างความรู้ความเข้าใจให้แก่สตรีตั้งครรภ์และครอบครัว ให้สามารถดูแลสุขภาพกายและใจได้อย่างเต็มศักยภาพ พร้อมทั้งอำนวยความสะดวกในการเข้าถึงบริการทางการแพทย์ของโรงพยาบาล
            </p>
          

            <p className={styles.aboutUsText}>
              วิสัยทัศน์ของเราคือการเป็นผู้นำด้านนวัตกรรมดิจิทัลเพื่อสุขภาพแม่และเด็กในระดับชุมชน สร้างแพลตฟอร์มที่เข้าถึงง่ายและเป็นมิตร เพื่อสร้างชุมชนออนไลน์ที่แข็งแกร่งสำหรับคุณแม่ได้แลกเปลี่ยนประสบการณ์และให้กำลังใจซึ่งกันและกัน
            </p>
              <p className={styles.aboutUsText}>
              โรงพยาบาลชุมชนเทศบาลเมืองกำแพงเพชร พร้อมเคียงข้างคุณแม่ทุกการฝากครรภ์ เพื่อสุขภาพแม่และลูกน้อยที่แข็งแรงไปด้วยกัน
            </p>
          
          </motion.div>
          <motion.div
            className={styles.splitSectionImageWrapper}
            initial={{ opacity: 0, scale: 0.8 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true, amount: 0.5 }}
            transition={{ duration: 0.6 }}
          >
            <Image
              src="/content/about-image.jpg"
              alt="บรรยากาศภายในคลินิก"
              width={500}
              height={500}
              className={styles.sectionImage}
            />
          </motion.div>
        </div>
      </section>

      {/* 
        === Section: ติดต่อเรา (Contact) ===
        - แสดงข้อมูลการติดต่อพื้นฐาน เช่น ที่อยู่และเบอร์โทรศัพท์
      */}
      <section id="contact" className={styles.contactSection}>
        <div className={styles.container}>
          <h2 className={styles.sectionTitle}>ติดต่อเรา</h2>
          <p className={styles.sectionDescription}>
            เราพร้อมให้คำปรึกษาและดูแลคุณในทุกขั้นตอนของการตั้งครรภ์
            ติดต่อเราได้ตามช่องทางด้านล่างนี้
          </p>
          <motion.div 
            className={styles.contactDetails}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.2 }}
            variants={containerVariants}
          >
            <motion.div className={styles.contactDetailItem} variants={itemVariants}>
              <h3 className={styles.contactTitle}>ที่อยู่</h3>
              <p className={styles.contactInfo}>35 ซ.2 ถ.ราชดำเนิน 1 ต.ในเมือง อ.เมือง จ.กำแพงเพชร 62000</p>
            </motion.div>

            <motion.div className={styles.contactDetailItem} variants={itemVariants}>
              <h3 className={styles.contactTitle}>โทรศัพท์</h3>
              <p className={styles.contactInfo}>055-716-715</p>
            </motion.div>

          </motion.div>
        </div>
      </section>

      {/* 
        === Section: Call to Action (ปิดท้าย) ===
        - ส่วนกระตุ้นให้ผู้ใช้งานทำการนัดหมาย ซึ่งเป็นเป้าหมายหลักของหน้าเว็บ
      */}
      <section className={styles.ctaSection}>
        <div className={styles.ctaContainer}>
          <div className={styles.ctaContent}>
            <h2 className={styles.ctaTitle}>พร้อมสำหรับการดูแลที่ดีที่สุดแล้วหรือยัง?</h2>
            <p className={styles.ctaDescription}>
              เริ่มต้นการเดินทางที่แสนพิเศษของคุณกับเรา
              นัดหมายเพื่อฝากครรภ์และรับคำปรึกษาจากทีมผู้เชี่ยวชาญของเราได้แล้ววันนี้
            </p>
            <Link href="/PregnancyAppointmentSchedule" passHref>
              <motion.button
                className={`${styles.button} ${styles.buttonPrimary} ${styles.ctaButton}`}
                whileHover={{ scale: 1.05, y: -5 }}
                whileTap={{ scale: 0.95 }}
              >
                นัดหมายเลย
              </motion.button>
            </Link>
          </div>
        </div>
      </section>
    </main>
  )
}

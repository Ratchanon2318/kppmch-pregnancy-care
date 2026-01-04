import './globals.css'
import Script from 'next/script'
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import LineSidebar from './components/LineSidebar';
import BackToTopButton from './components/BackToTopButton';

/**
 * =====================================================================
 * METADATA (สำหรับ SEO และ Social Sharing)
 * =====================================================================
 * `metadata` object นี้ใช้สำหรับกำหนดข้อมูล meta tags ของเว็บไซต์
 * ซึ่งมีความสำคัญอย่างยิ่งต่อการทำ SEO (Search Engine Optimization)
 * และการแสดงผลเมื่อแชร์ลิงก์ไปยัง Social Media เช่น Facebook, LINE
 */
export const metadata = {

  // URL พื้นฐานสำหรับสร้าง URL ทั้งหมดใน metadata
  metadataBase: new URL('https://kppmch-pregnant.vercel.app/'),
  title: 'ฝากครรภ์กำแพงเพชร - งานส่งเสริมสุขภาพแม่และเด็ก | โรงพยาบาลชุมชนเทศบาลเมืองกำแพงเพชร',
  description: 'บริการฝากครรภ์คุณภาพ คลินิกพัฒนาการเด็ก และวางแผนครอบครัว โดยทีมแพทย์ผู้เชี่ยวชาญที่โรงพยาบาลชุมชนเทศบาลเมืองกำแพงเพชร พร้อมให้คำปรึกษาและดูแลคุณแม่และลูกน้อย',

  // Keywords สำหรับ Search
  keywords: ['ฝากครรภ์กำแพงเพชร', 'คลินิกฝากครรภ์กำแพงเพชร', 'ฝากครรภ์', 'ตั้งครรภ์', 'อนามัยแม่และเด็ก', 'โรงพยาบาลชุมชนเทศบาลเมืองกำแพงเพชร', 'สุขภาพสตรีมีครรภ์', 'พัฒนาการเด็ก', 'วางแผนครอบครัว'],

  authors: [{ name: 'งานส่งเสริมสุขภาพ โรงพยาบาลชุมชนเทศบาลเมืองกำแพงเพชร' }],

  // กำหนดไอคอน (Favicon) สำหรับแสดงผลบน Browser Tab และอุปกรณ์ต่างๆ
  // ไอคอนสำหรับอุปกรณ์ต่างๆ
  icons: {
    icon: [
      { url: '/favicon.ico', sizes: 'any' },
      { url: '/android-chrome-192x192.png', sizes: '192x192', type: 'image/png' },
      { url: '/android-chrome-512x512.png', sizes: '512x512', type: 'image/png' },
    ],
    apple: '/apple-touch-icon.png', // <-- ไอคอนสำหรับอุปกรณ์ Apple
  },

  // ไฟล์ Manifest สำหรับ PWA (Progressive Web App)
  manifest: '/site.webmanifest',

  /**
   * Open Graph (OG) Tags
   * ใช้สำหรับควบคุมการแสดงผลเมื่อมีการแชร์ลิงก์ไปยัง Social Media เช่น Facebook, LINE
   */
  openGraph: {
    title: 'ฝากครรภ์กำแพงเพชร - งานส่งเสริมสุขภาพแม่และเด็ก | โรงพยาบาลชุมชนเทศบาลเมืองกำแพงเพชร',
    description: 'บริการฝากครรภ์คุณภาพ วางแผนครอบครัว และคลินิกพัฒนาการเด็ก โดยทีมแพทย์ผู้เชี่ยวชาญ',
    url: '/',
    siteName: 'โรงพยาบาลชุมชนเทศบาลเมืองกำแพงเพชร',
    images: [
      {
        url: '/og-image.png', // <-- ให้สร้างและนำไฟล์ภาพไปไว้ที่ public/og-image.png
        width: 1200,
        height: 630,
        alt: 'งานส่งเสริมสุขภาพแม่และเด็ก โรงพยาบาลชุมชนเทศบาลเมืองกำแพงเพชร',
      },
    ],
    locale: 'th_TH',
    type: 'website',
  },

  /**
   * Twitter Card Tags
   * ใช้สำหรับควบคุมการแสดงผลเมื่อมีการแชร์ลิงก์ไปยัง Twitter
   */
  twitter: {
    card: 'summary_large_image',
    title: 'งานส่งเสริมสุขภาพแม่และเด็ก | โรงพยาบาลชุมชนเทศบาลเมืองกำแพงเพชร',
    description: 'เว็บไซต์สำหรับสตรีมีครรภ์และครอบครัว เพื่อรับข้อมูลและคำแนะนำในการดูแลสุขภาพ',
    images: ['/og-image.png'], // <-- ใช้ภาพเดียวกับ Open Graph ได้
  },

  // การควบคุม Search Engine Bots (เช่น Googlebot)
  // บอกให้ bot สามารถ index และ follow ลิงก์ในหน้านี้ได้
  // การควบคุม Search Engine Bots
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },

  // URL หลักของหน้า (Canonical URL) เพื่อป้องกันปัญหาเนื้อหาซ้ำซ้อน (Duplicate Content)
  // URL หลักของหน้า
  alternates: {
    canonical: '/',
  },
};

/**
 * `viewport` object ใช้สำหรับควบคุมการแสดงผลบนหน้าจอมือถือ
 * - `width=device-width`: ให้ความกว้างของหน้าเว็บเท่ากับความกว้างของอุปกรณ์
 * - `initial-scale=1`: กำหนดระดับการซูมเริ่มต้น
 * - `maximum-scale=1`: ป้องกันไม่ให้ผู้ใช้ซูมเข้า-ออก ซึ่งช่วยให้ Layout คงที่
 */
export const viewport = {
  width: 'device-width',
  initialScale: 1,
  maximumScale: 1,
};

/**
 * =====================================================================
 * ROOT LAYOUT COMPONENT
 * =====================================================================
 * นี่คือ Layout หลักของเว็บไซต์ คอมโพเนนต์ที่อยู่ในไฟล์นี้จะถูกแสดงผลในทุกหน้า
 * @param {object} { children } - `children` คือ page component ที่จะถูก render ภายใน Layout นี้
 */
export default function RootLayout({ children }) {
  return (
    <html lang="th">
      <head>
        {/* --- Google Fonts --- */}
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="true" />
        <link href="https://fonts.googleapis.com/css2?family=Mitr:wght@400;500;600&display=swap" rel="stylesheet" />

        {/* 
          =====================================================================
          JSON-LD Structured Data (Schema Markup)
          =====================================================================
          - บอก Search Engine ว่าเว็บไซต์นี้เป็นขององค์กรประเภทใด (MedicalClinic)
          - ช่วยเพิ่มความน่าเชื่อถือและอาจทำให้แสดงผลแบบ Rich Snippets ในหน้าค้นหา
        */}
        <Script
          id="json-ld-schema"
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "MedicalClinic",
              "name": "งานส่งเสริมสุขภาพแม่และเด็ก โรงพยาบาลชุมชนเทศบาลเมืองกำแพงเพชร",
              "description": "คลินิกฝากครรภ์ วางแผนครอบครัว และส่งเสริมพัฒนาการเด็ก ในจังหวัดกำแพงเพชร",
              "url": "https://kppmch-pregnant.vercel.app/",
              "logo": "https://kppmch-pregnant.vercel.app/logo.jpg",
              "telephone": "+66-55-716-715",
              "address": "35 ซ.2 ถ.ราชดำเนิน 1 ต.ในเมือง อ.เมือง จ.กำแพงเพชร 62000"
            })
          }}
        />
        
        {/* สามารถเพิ่ม Script หรือ meta tags อื่นๆ ที่ต้องการในส่วน head นี้ได้ */}
      </head>
      <body>
        {/* คอมโพเนนต์ที่จะแสดงผลในทุกหน้า */}
        <Navbar />
        {/* เนื้อหาหลักของหน้าจะถูกแสดงผลที่นี่ */}
        <main>{children}</main>
        <Footer />
        <BackToTopButton />
        <LineSidebar />

      </body>
    </html>
  )
}
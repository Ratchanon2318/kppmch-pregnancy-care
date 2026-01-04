import { Client, validateSignature } from "@line/bot-sdk";
import { NextResponse } from 'next/server';

// --- นำเข้า Flex Messages จากไฟล์ JSON ---
import getPrenatalAppointments from "./flex_messages/PrenatalAppointments.json" with { type: "json" };
import educatePregnantWomen from "./flex_messages/EducatePregnantWomen.json" with { type: "json" };
import getContactUS from "./flex_messages/ContactUsFlexmessage.json" with { type: "json" };
import getHelpCenter from "./flex_messages/HelpCenterFlexmessage.json" with { type: "json" };

import communicationAndSupport from "./flex_messages/AnnouncementsFlexmessage.json" with { type: "json" };
import getContraceptiveInfo from "./flex_messages/ContraceptiveInfoFlexmessage.json" with { type: "json" };
import getPregnancySymptoms from "./flex_messages/PregnancySymptomFlexmessage.json" with { type: "json" };
import supportMotherChildWellbeing from "./flex_messages/MotherChildWellbeingFlexmessage.json" with { type: "json" };
import getAboutUs from "./flex_messages/AboutUsFlexmessage.json" with { type: "json" };
import getWhenToGetCare from "./flex_messages/WhenToGetCareFlexmessage.json" with { type: "json" };
import getTeam from "./flex_messages/TeamFlexmessage.json" with { type: "json" };
import getFaq from "./flex_messages/FaqFlexmessage.json" with { type: "json" };

/**
 * GET Handler: สำหรับตรวจสอบสถานะของ Webhook (Health Check)
 * เมื่อเข้าถึง URL นี้ผ่านเบราว์เซอร์หรือเครื่องมือทดสอบ จะตอบกลับว่าบอททำงานอยู่
 * @param {Request} request - อ็อบเจกต์ Request ที่ Next.js ส่งเข้ามา
 */
export async function GET(request) {
  return NextResponse.json({ status: 'ok', message: 'Bot is live!' });
}

/**
 * POST Handler: จุดหลักในการรับ Event ทั้งหมดจาก LINE Messaging API
 * @param {Request} request - อ็อบเจกต์ Request ที่ Next.js ส่งเข้ามา
 */
export async function POST(request) {
  // ตั้งค่า Configuration สำหรับ LINE Bot SDK
  // ดึงค่าจาก Environment Variables เพื่อความปลอดภัย
  const config = {
    channelAccessToken: process.env.LINE_CHANNEL_ACCESS_TOKEN,
    channelSecret: process.env.CHANNEL_SECRET,
  };

  // ใช้ try...catch เพื่อดักจับข้อผิดพลาดที่อาจเกิดขึ้นในกระบวนการทั้งหมด
  try {
    // ตรวจสอบว่ามี Environment Variables ที่จำเป็นครบถ้วนหรือไม่
    if (!config.channelAccessToken || !config.channelSecret) {
      console.error("Missing LINE Channel Access Token or Channel Secret");
      return new Response("Server configuration error", { status: 500 });
    }

    // สร้าง instance ของ LINE Client ด้วย config ที่ตั้งค่าไว้
    const client = new Client(config);

    // อ่าน request body เป็น Buffer (ข้อมูลดิบ) ก่อน
    // **สำคัญมาก** สำหรับการตรวจสอบลายเซ็น (Signature Validation) ต้องใช้ body ที่ยังไม่ถูกแปลงเป็น JSON
    const bodyBuffer = await request.arrayBuffer();
    const body = Buffer.from(bodyBuffer).toString('utf-8');

    // ดึงค่า 'x-line-signature' จาก header ของ request
    const signature = request.headers.get('x-line-signature');

    // ตรวจสอบว่ามี signature ส่งมาใน header หรือไม่
    if (!signature) {
      console.error("Signature validation failed: Missing 'x-line-signature' header.");
      return new Response('Missing signature', { status: 400 });
    }

    // (สำหรับ Debug) แสดงค่า Channel Secret 4 ตัวท้ายเพื่อตรวจสอบว่าโหลดมาถูกต้อง
    console.log(`Verifying with Channel Secret: ...${config.channelSecret.slice(-4)}`);

    // ตรวจสอบความถูกต้องของลายเซ็น
    // ถ้าลายเซ็นไม่ถูกต้อง แสดงว่า request อาจไม่ได้มาจาก LINE หรือมีการปลอมแปลง
    if (!validateSignature(body, config.channelSecret, signature)) {
      console.error("Signature validation failed: Invalid signature.");
      return new Response('Invalid signature', { status: 401 });
    }

    // แปลง body (ที่เป็น string) ให้เป็น JSON object เพื่อเข้าถึง events
    const events = JSON.parse(body).events;

    // ถ้าไม่มี events ใน request ก็ไม่ต้องทำอะไรต่อ
    if (!events || events.length === 0) {
      return NextResponse.json({ success: true });
    }

    // วนลูปจัดการทุก event ที่ได้รับมาใน request เดียว (อาจมีหลาย event พร้อมกัน)
    // ใช้ Promise.all เพื่อให้จัดการทุก event แบบขนาน (concurrently)
    await Promise.all(events.map((event) => handleEvent(event, client)));

    // ส่งการตอบกลับสถานะ success กลับไปให้ LINE API เพื่อยืนยันว่าได้รับ event แล้ว
    return NextResponse.json({ success: true });

  } catch (error) {
    console.error('Webhook Error:', error.message || error);
    // หากเกิดข้อผิดพลาดที่ไม่คาดคิด ให้ส่งสถานะ 500 กลับไป
    return new Response('Internal Server Error', { status: 500 });
  }
}

// Map keywords to their corresponding Flex Message JSON.
const messageMap = {
  'ตารางนัดหมายและการจองคิว': getPrenatalAppointments,
  'ความรู้คุณแม่ตั้งครรภ์': educatePregnantWomen,
  'ติดต่อ-สอบถาม': getContactUS,
  'ศูนย์ช่วยเหลือ': getHelpCenter,
  'ความรู้เกี่ยวกับการวางแผนครอบครัว': getContraceptiveInfo,
  'ประชาสัมพันธ์': communicationAndSupport,
  'ความรู้หญิงตั้งครรภ์': getPregnancySymptoms,
  'งานส่งเสริมสุขภาพแม่และเด็ก': supportMotherChildWellbeing,
  'เกี่ยวกับเรา': getAboutUs,
  'about us': getAboutUs,
  'ควรฝากเมื่อไหร่': getWhenToGetCare,
  'ควรฝากครรภ์เมื่อไหร่?': getWhenToGetCare,
  'บุคลากร': getTeam,
  'คำถามที่พบบ่อย': getFaq,

};

/**
 * ฟังก์ชันสำหรับจัดการแต่ละ Event ที่ได้รับจาก LINE
 * @param {object} event - อ็อบเจกต์ Event ที่ได้รับจาก LINE
 * @param {Client} client - Instance ของ LINE Client ที่สร้างไว้
 */
async function handleEvent(event, client) {
  // กรอง Event: สนใจเฉพาะ Event ที่เป็นข้อความ (message) และเป็นประเภท text เท่านั้น
  if (event.type !== 'message' || event.message.type !== 'text') {
    return Promise.resolve(null);
  }

  // ดึงข้อความจากผู้ใช้, ตัดช่องว่างหน้า-หลัง, และแปลงเป็นตัวพิมพ์เล็กทั้งหมดเพื่อให้ง่ายต่อการเปรียบเทียบ
  const userMessage = event.message.text.trim().toLowerCase();
  // ดึง userId จาก event source เพื่อใช้ในการตอบกลับ
  const userId = event.source.userId;

  // บาง event ที่มาจากระบบ (เช่น จาก LINE Official Account Manager) อาจไม่มี userId
  // ถ้าไม่มี userId ก็ไม่สามารถตอบกลับได้ ให้ข้ามไป
  if (!userId) {
    console.log("Event source does not have a userId, skipping.");
    return Promise.resolve(null);
  }

  // ค้นหาข้อความตอบกลับจาก messageMap โดยใช้ข้อความจากผู้ใช้เป็น key
  const replyMessage = messageMap[userMessage];

  // ถ้าเจอข้อความที่ตรงกันใน messageMap
  if (replyMessage) {
    // แสดง Loading Animation ในห้องแชทของผู้ใช้
    // เพื่อให้ผู้ใช้รู้ว่าบอทกำลังประมวลผล
    // เราเรียก API นี้โดยตรงผ่าน client.http
    await client.http.post("https://api.line.me/v2/bot/chat/loading/start", { chatId: userId, loadingSeconds: 5 });

    // ส่งข้อความตอบกลับ (Flex Message) ไปยังผู้ใช้
    // ใช้ event.replyToken เพื่ออ้างอิงถึงข้อความที่ต้องการตอบกลับ
    return client.replyMessage(event.replyToken, replyMessage);
  }

  // ถ้าข้อความจากผู้ใช้ไม่ตรงกับ keyword ใดๆ ใน messageMap เลย
  // ก็จะจบการทำงานสำหรับ event นี้ โดยไม่ต้องทำอะไร
  return Promise.resolve(null);
}

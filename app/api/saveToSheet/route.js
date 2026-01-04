// นำเข้า NextResponse จาก Next.js Server เพื่อใช้ในการสร้างการตอบกลับของ API
import { NextResponse } from 'next/server';

/**
 * ฟังก์ชันนี้เป็น API Route Handler สำหรับ HTTP POST request
 * มีหน้าที่รับข้อมูลจากฟอร์ม และส่งต่อไปยัง Google Apps Script Web App เพื่อบันทึกข้อมูลลงใน Google Sheet
 * @param {Request} request - อ็อบเจกต์ Request ที่ Next.js ส่งเข้ามา
 */
export async function POST(request) {
  // URL ของ Web App ที่ได้จากการ deploy บน Google Apps Script
  // ข้อมูลจากฟอร์มจะถูกส่งไปยัง URL นี้
  const googleAppScriptUrl = "https://script.google.com/macros/s/AKfycbyC3Cuwis99wI5T-XcHn33VR6O4YoQ1Pr-Q8Ae9bkrB2Z1SanSah_jUfNqo6vjxZLpv/exec";

  // ตรวจสอบว่ามีการกำหนดค่า URL ของ Google Apps Script แล้วหรือยัง
  // เพื่อป้องกันข้อผิดพลาดหากลืมใส่ URL
  if (!googleAppScriptUrl || googleAppScriptUrl === "YOUR_WEB_APP_URL_HERE") {
    console.error('Google Apps Script URL is not configured in the API route.');
    // ส่งการตอบกลับพร้อมสถานะ 500 (Internal Server Error) กลับไป
    return NextResponse.json(
      { error: 'Server configuration error: Google Apps Script URL is missing.' },
      { status: 500 }
    );
  }

  // ใช้ try...catch เพื่อดักจับข้อผิดพลาดที่อาจเกิดขึ้นระหว่างการส่งข้อมูล
  try {
    // แปลงข้อมูล (body) ที่ส่งมาจาก client (ในรูปแบบ JSON) ให้เป็น JavaScript object
    const formData = await request.json();

    // ส่ง HTTP POST request ไปยัง URL ของ Google Apps Script
    const response = await fetch(googleAppScriptUrl, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      // แปลง JavaScript object กลับเป็น JSON string เพื่อส่งไปใน body ของ request
      body: JSON.stringify(formData),
      // การตั้งค่า redirect: 'follow' เพื่อให้ fetch ตามการ redirect ที่อาจเกิดขึ้นจากฝั่ง Google Apps Script
      redirect: 'follow'
    });

    // ตรวจสอบว่าการตอบกลับจาก Google Apps Script สำเร็จหรือไม่ (HTTP status 200-299)
    if (!response.ok) {
        // หากไม่สำเร็จ อ่านข้อความ error ที่สคริปต์ส่งกลับมา
        const errorText = await response.text();
        console.error('Error from Google Apps Script:', errorText);
        // สร้าง Error เพื่อให้ถูกดักจับโดย catch block ด้านล่าง
        throw new Error('Failed to save data to Google Sheet.');
    }

    // แปลงการตอบกลับ (response) จาก Google Apps Script ซึ่งเป็น JSON ให้เป็น JavaScript object
    const result = await response.json();

    // ตรวจสอบผลลัพธ์ที่ได้จากสคริปต์ (ตามที่เราเขียนโค้ดใน Apps Script ให้ตอบกลับมา)
    // ในกรณีนี้ เราคาดหวังว่าจะได้ { "result": "success" }
    if (result.result !== 'success') {
      console.error('Non-success response from Google Apps Script:', result);
      throw new Error('Google Apps Script reported an error.');
    }

    // หากทุกอย่างสำเร็จ ส่งการตอบกลับสถานะ success กลับไปยัง client (หน้าเว็บ)
    return NextResponse.json({ success: true, data: result });

  } catch (error) {
    // ดักจับข้อผิดพลาดทั้งหมดที่เกิดขึ้นใน try block
    console.error('API route /api/saveToSheet error:', error.message);
    // ส่งการตอบกลับพร้อมสถานะ 500 และรายละเอียดของข้อผิดพลาด
    return NextResponse.json(
      { error: 'Failed to submit to Google Sheet.', details: error.message },
      { status: 500 }
    );
  }
}

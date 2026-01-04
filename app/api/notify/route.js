// นำเข้า NextResponse จาก Next.js Server เพื่อใช้ในการสร้างการตอบกลับของ API
import { NextResponse } from 'next/server';

/**
 * ฟังก์ชันนี้เป็น API Route Handler สำหรับ HTTP POST request
 * มีหน้าที่รับข้อมูลการนัดหมายจากฟอร์ม และส่งการแจ้งเตือนไปยังกลุ่ม LINE ที่กำหนดไว้
 * @param {Request} request - อ็อบเจกต์ Request ที่ Next.js ส่งเข้ามา
 */
export async function POST(request) {
  // ดึงค่า Environment Variables ที่จำเป็นสำหรับการเชื่อมต่อกับ LINE API
  // ค่าเหล่านี้ถูกเก็บไว้ในไฟล์ .env.local เพื่อความปลอดภัย
  const LINE_MESSAGING_API = process.env.LINE_MESSAGING_API;
  const LINE_CHANNEL_ACCESS_TOKEN = process.env.LINE_CHANNEL_ACCESS_TOKEN;
  const LINE_GROUP_ID = process.env.LINE_GROUP_ID;

  // ตรวจสอบว่ามีการตั้งค่า Token และ Group ID ใน environment variables (.env.local) ครบถ้วนหรือไม่
  // หากค่าใดค่าหนึ่งหายไป จะแสดงข้อผิดพลาดใน console ของ server และส่งการตอบกลับสถานะ 500 กลับไป
  if (!LINE_MESSAGING_API || !LINE_CHANNEL_ACCESS_TOKEN || !LINE_GROUP_ID) {
    console.error('Line API credentials not configured in .env.local');
    return NextResponse.json({ success: false, message: 'Line API credentials are not configured on the server.' }, { status: 500 });
  }

  // ใช้ try...catch เพื่อดักจับข้อผิดพลาดที่อาจเกิดขึ้นระหว่างการทำงาน
  try {
    // แปลงข้อมูล (body) ที่ส่งมาจาก client (ในรูปแบบ JSON) ให้เป็น JavaScript object
    const formData = await request.json();

    /**
     * ฟังก์ชัน Helper สำหรับสร้างแถวข้อมูลแบบ "หัวข้อ: ค่า" ใน Flex Message
     * @param {string} label - ข้อความหัวข้อ (เช่น 'ชื่อ-นามสกุล:')
     * @param {string} value - ค่าของข้อมูล (เช่น 'สมหญิง ใจดี')
     * @returns {object} - Object สำหรับ Flex Message ในส่วนของแถวข้อมูล
     */
    function createReceiptRow(label, value) {
      return {
        type: 'box',
        layout: 'horizontal',
        contents: [
          {
            type: 'text',
            text: label,
            size: 'sm',
            color: '#8C8C8C', // สีเทาสำหรับหัวข้อ
            flex: 0,
            wrap: true,
          },
          {
            type: 'text',
            text: String(value), // แปลงค่าเป็น String เพื่อป้องกัน error หากค่าที่ได้ไม่ใช่ string
            size: 'sm',
            color: '#444444', // สีเทาเข้มสำหรับค่าข้อมูล
            align: 'end',
            wrap: true,
          },
        ],
      };
    }

    // สร้างเนื้อหาหลักของ Flex Message โดยใช้ฟังก์ชัน createReceiptRow เพื่อสร้างแต่ละแถว
    const bodyContents = [
        createReceiptRow('ชื่อ-นามสกุล:', `${formData.firstName} ${formData.lastName}`),
        createReceiptRow('เลขบัตรประชาชน:', formData.nationalId || '-'),
        createReceiptRow('เบอร์โทร:', formData.phone),
        { type: 'separator', margin: 'md' },
        createReceiptRow('บริการ:', formData.service),
        createReceiptRow('วันที่นัด:', formData.appointmentDate),
        createReceiptRow('เวลา:', formData.appointmentTime),
        { type: 'separator', margin: 'md' },
        // ส่วนสำหรับแสดงหมายเหตุเพิ่มเติม ถ้าไม่มีข้อมูลจะแสดงเป็น '-'
        {
            type: 'box',
            layout: 'vertical',
            margin: 'md',
            contents: [
                {
                    type: 'text',
                    text: 'หมายเหตุ:',
                    size: 'sm',
                    color: '#8C8C8C',
                },
                {
                    type: 'text',
                    text: formData.notes || '-',
                    wrap: true,
                    size: 'sm',
                    color: '#444444',
                    margin: 'sm'
                }
            ]
        }
    ];

    // โครงสร้างหลักของ Flex Message ที่จะส่งไปใน LINE
    const flexMessage = {
      type: 'flex',
      altText: `มีผู้ลงทะเบียนใหม่: ${formData.firstName} ${formData.lastName}`, // ข้อความที่จะแสดงในการแจ้งเตือนบนอุปกรณ์ที่ไม่รองรับ Flex Message
      contents: {
        type: 'bubble',
        styles: {
            header: {
                backgroundColor: '#f87171', // สีแดง-400 (Tailwind)
            },
        },
        // ส่วนหัวของข้อความ
        header: {
            type: 'box',
            layout: 'vertical',
            paddingAll: '20px',
            contents: [
                {
                    type: 'text',
                    text: '💖 มีผู้ลงทะเบียนใหม่ค่ะ',
                    weight: 'bold',
                    size: 'lg',
                    color: '#FFFFFF',
                },
                {
                    type: 'text',
                    text: 'งานส่งเสริมสุขภาพแม่และเด็ก',
                    size: 'sm',
                    color: '#FFFFFFCC',
                },
            ],
        },
        // ส่วนเนื้อหาของข้อความ (Body)
        body: {
          type: 'box',
          layout: 'vertical',
          spacing: 'md',
          paddingAll: '20px',
          contents: bodyContents,
        },
        // ส่วนท้ายของข้อความ (Footer)
        footer: {
            type: 'box',
            layout: 'vertical',
            spacing: 'sm',
            contents: [
                {
                    type: 'separator'
                },
                {
                    type: 'box',
                    layout: 'vertical',
                    contents: [
                        {
                            type: 'text',
                            text: `ข้อมูล ณ วันที่: ${new Date().toLocaleString('th-TH')}`,
                            color: '#8C8C8C',
                            size: 'xs',
                            align: 'center',
                            margin: 'md'
                        }
                    ]
                }
            ]
        },
      },
    };

    // สร้างอ็อบเจกต์ message ที่จะส่งไปยัง LINE Messaging API
    const message = {
      to: LINE_GROUP_ID, // ID ของกลุ่ม LINE ที่ต้องการส่งข้อความไป
      messages: [flexMessage] // ข้อความที่จะส่ง (สามารถส่งได้หลายข้อความในครั้งเดียว)
    };

    // ส่ง HTTP POST request ไปยัง Line Messaging API
    const response = await fetch(LINE_MESSAGING_API, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${LINE_CHANNEL_ACCESS_TOKEN}`
      },
      body: JSON.stringify(message)
    });

    // ตรวจสอบว่าการส่งข้อความสำเร็จหรือไม่ (HTTP status 200-299)
    if (!response.ok) {
      // หากไม่สำเร็จ อ่านข้อมูล error ที่ LINE API ส่งกลับมา
      const errorData = await response.json();
      console.error('Line API Error:', errorData);
      // ส่งการตอบกลับพร้อมสถานะข้อผิดพลาดกลับไปยัง client
      return NextResponse.json({ success: false, message: 'Failed to send Line message.' }, { status: response.status });
    }

    // หากสำเร็จ ส่งการตอบกลับสถานะ success กลับไปยัง client (หน้าเว็บ)
    return NextResponse.json({ success: true, message: 'Notification sent successfully.' });

  } catch (error) {
    // ดักจับข้อผิดพลาดที่ไม่คาดคิดที่อาจเกิดขึ้นในระหว่างการทำงาน (เช่น network error, JSON parsing error)
    console.error('API Route Error:', error);
    return NextResponse.json({ success: false, message: 'Internal Server Error' }, { status: 500 });
  }
}

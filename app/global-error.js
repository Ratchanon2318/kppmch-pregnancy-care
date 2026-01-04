'use client' // Error boundaries must be Client Components
 
export default function GlobalError({ error, reset }) {
  return (
    // global-error must include html and body tags
    <html>
      <body className="bg-red-50 font-sans">
        <div className="min-h-screen flex flex-col items-center justify-center text-center px-4">
          <div className="bg-white p-8 md:p-12 rounded-2xl shadow-lg max-w-lg w-full">
            <h2 className="text-3xl md:text-4xl font-bold text-red-500 mb-4">เกิดข้อผิดพลาดบางอย่าง</h2>
            <p className="text-gray-600 mb-8">ขออภัยค่ะ ระบบเกิดข้อผิดพลาดที่ไม่คาดคิด กรุณาลองใหม่อีกครั้ง</p>
            <button onClick={() => reset()} className="bg-red-400 text-white font-bold py-3 px-8 rounded-full hover:bg-red-500 transition duration-300 text-lg shadow-md hover:shadow-lg">
              ลองอีกครั้ง
            </button>
          </div>
        </div>
      </body>
    </html>
  )
}
import Link from 'next/link'
 
export default function NotFound() {
  return (
    <div className="min-h-screen bg-red-50 flex flex-col items-center justify-center text-center px-4">
      <div className="bg-white p-8 md:p-12 rounded-2xl shadow-lg">
        <h1 className="text-6xl md:text-9xl font-bold text-red-400">404</h1>
        <h2 className="text-2xl md:text-4xl font-semibold text-gray-800 mt-4 mb-2">ไม่พบหน้าที่คุณค้นหา</h2>
        <p className="text-gray-600 mb-8">ขออภัยค่ะ ดูเหมือนว่าหน้าที่คุณกำลังมองหาไม่มีอยู่ หรืออาจถูกย้ายไปที่อื่น</p>
        <Link href="/">
          <button className="bg-red-400 text-white font-bold py-3 px-8 rounded-full hover:bg-red-500 transition duration-300 text-lg shadow-md hover:shadow-lg">
            กลับสู่หน้าแรก
          </button>
        </Link>
      </div>
    </div>
  )
}
// src/app/page.tsx
import ProductForm from '@/components/ProductForm'; // Import Client Component từ alias @/

/**
 * Đây là Server Component, dùng để tải dữ liệu, SEO, và render các thành phần tĩnh.
 */
export default function HomePage() {
  return (
    <main className="flex min-h-screen flex-col items-center p-24 bg-gray-100">
      <div className="w-full max-w-xl bg-white p-8 rounded-xl shadow-2xl">
        <h1 className="text-4xl font-extrabold mb-8 text-center text-gray-900">
          Quản Lý Cửa Hàng Game
        </h1>
        
        <h2 className="text-2xl font-semibold mb-6 border-b pb-2 text-gray-700">
          Thêm Sản Phẩm Mới
        </h2>
        
        {/* Nhúng Client Component vào Server Component */}
        <ProductForm />
        
        <p className="mt-8 text-center text-sm text-gray-500">
          Giao diện được xây dựng bằng Next.js, TypeScript và Tailwind CSS.
        </p>
      </div>
    </main>
  );
}
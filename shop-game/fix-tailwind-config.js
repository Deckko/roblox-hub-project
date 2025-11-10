// fix-tailwind-config.js (Đã tối ưu hóa và sử dụng CommonJS)

const fs = require('fs').promises;
const path = require('path');

const PROJECT_ROOT = process.cwd();

/**
 * 1. Cập nhật package.json:
 * - Thêm @tailwindcss/postcss, đảm bảo tailwindcss là v4.
 * - Gỡ bỏ autoprefixer.
 */
async function updatePackageJson() {
    const filePath = path.join(PROJECT_ROOT, 'package.json');
    console.log(`\nĐang đọc tệp: ${filePath}`);
    
    try {
        const data = await fs.readFile(filePath, 'utf8');
        let packageJson = JSON.parse(data);

        if (packageJson.devDependencies) {
            console.log('Đang cập nhật devDependencies...');
            
            // 1. Loại bỏ autoprefixer
            if (packageJson.devDependencies.autoprefixer) {
                delete packageJson.devDependencies.autoprefixer;
                console.log('   ✅ Đã loại bỏ "autoprefixer"');
            }

            // 2. Cập nhật @tailwindcss/postcss và tailwindcss
            const newTwVersion = '^4.1.0'; 
            packageJson.devDependencies['@tailwindcss/postcss'] = newTwVersion;
            
            if (!packageJson.devDependencies.tailwindcss || !packageJson.devDependencies.tailwindcss.startsWith('^4')) {
                 packageJson.devDependencies.tailwindcss = newTwVersion;
                 console.log(`   ⚠️ Đã cập nhật "tailwindcss" thành ${newTwVersion}`);
            }
            console.log(`   ✅ Đã thêm "@tailwindcss/postcss" (${newTwVersion})`);


            await fs.writeFile(filePath, JSON.stringify(packageJson, null, 2));
            console.log('   ✅ Đã ghi đè thành công package.json');
        } else {
            console.warn('   Không tìm thấy devDependencies để cập nhật.');
        }

    } catch (error) {
        console.error(`   ❌ Lỗi khi xử lý package.json: ${error.message}`);
        console.error('   => LỖI CÚ PHÁP: Vui lòng kiểm tra package.json, đảm bảo nó là JSON hợp lệ (bắt đầu bằng { và kết thúc bằng }).');
        process.exit(1); // Thoát nếu tệp bị lỗi JSON
    }
}

/**
 * 2. Cập nhật postcss.config.js
 */
async function updatePostcssConfig() {
    const filePath = path.join(PROJECT_ROOT, 'postcss.config.js');
    console.log(`\nĐang đọc tệp: ${filePath}`);
    
    try {
        const newContent = 
`/**
 * Cấu hình tự động cập nhật cho Tailwind CSS v4.
 * Trong v4, không cần autoprefixer, chỉ cần plugin chính @tailwindcss/postcss.
 * @type {import('postcss').Config}
 */
module.exports = {
  plugins: {
    '@tailwindcss/postcss': {},
  },
};
`;

        await fs.writeFile(filePath, newContent);
        console.log(`   ✅ Đã cập nhật thành công ${path.basename(filePath)} với cấu hình v4.`);

    } catch (error) {
        console.error(`   ❌ Lỗi khi xử lý ${path.basename(filePath)}: ${error.message}`);
    }
}

/**
 * 3. Hướng dẫn các bước cuối cùng
 */
function logFinalSteps() {
    console.log('\n======================================================');
    console.log('✅ QUÁ TRÌNH TỰ ĐỘNG HÓA CẤU HÌNH ĐÃ HOÀN TẤT!');
    console.log('======================================================');
    console.log('CÁC BƯỚC THỦ CÔNG QUAN TRỌNG (BẮT BUỘC):');
    
    console.log('\n1. CẬP NHẬT CSS TOÀN CỤC:');
    console.log('   Mở tệp CSS toàn cục (ví dụ: src/app/globals.css) và thay thế tất cả các dòng @tailwind:');
    console.log('   ❌  @tailwind base; @tailwind components; @tailwind utilities;');
    console.log('   BẰNG một dòng duy nhất:');
    console.log('   ✅  @import "tailwindcss";');
    
    console.log('\n2. DỌN DẸP VÀ CÀI ĐẶT LẠI DỰ ÁN:');
    console.log('   Bạn cần xóa và cài đặt lại để áp dụng thay đổi trong package.json:');
    console.log('   1. Xóa thư mục tạm (Node_modules, .next, lock file):');
    console.log('      rm -rf node_modules .next package-lock.json');
    console.log('   2. Cài đặt lại dependencies:');
    console.log('      npm install');
    
    console.log('\n3. CHẠY DỰ ÁN:');
    console.log('   npm run dev');
}

async function main() {
    // Tắt cache của Node.js để đảm bảo đọc đúng package.json mới nhất
    require.cache[require.resolve('package.json')] = null; 
    await updatePackageJson();
    await updatePostcssConfig();
    logFinalSteps();
}

main();
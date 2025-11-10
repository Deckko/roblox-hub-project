document.addEventListener('DOMContentLoaded', function() {
    
    // Mô phỏng chức năng của nút Đăng nhập
    const loginBtn = document.querySelector('.btn-login');
    loginBtn.addEventListener('click', function() {
        alert('Chức năng Đăng nhập đang được kích hoạt... (Mô phỏng)');
    });

    // Mô phỏng chức năng của nút Đăng ký
    const registerBtn = document.querySelector('.btn-register');
    registerBtn.addEventListener('click', function() {
        alert('Chức năng Đăng ký đang được kích hoạt... (Mô phỏng)');
    });

    // Mô phỏng chức năng của nút Mua Ngay
    const buyButtons = document.querySelectorAll('.btn-buy');
    buyButtons.forEach(button => {
        button.addEventListener('click', function() {
            const productName = this.closest('.product-card').querySelector('h3').textContent;
            alert(`Bạn đã chọn mua: ${productName}. Chuyển đến trang thanh toán... (Mô phỏng)`);
        });
    });

    // Có thể thêm code cho Menu di động ở đây nếu cần triển khai Hamburger Menu
    
});
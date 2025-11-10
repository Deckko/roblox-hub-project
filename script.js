document.addEventListener('DOMContentLoaded', function() {
    
    // Khởi tạo các biến global để mô phỏng trạng thái đăng nhập
    let isLoggedIn = false;
    let currentUsername = "Khách";
    let userBalance = 0; // Số dư ban đầu

    const userActionsContainer = document.getElementById('userActions');
    const userBalanceSpan = document.getElementById('userBalance');
    const loginModal = document.getElementById('loginModal');
    const registerModal = document.getElementById('registerModal');
    const loginForm = document.getElementById('loginForm');
    const registerForm = document.getElementById('registerForm');
    
    // Khởi tạo trạng thái giao diện ban đầu
    updateUI();

    // ===================================
    // 1. CHỨC NĂNG QUẢN LÝ MODAL
    // ===================================

    window.openModal = function(modalId) {
        document.getElementById(modalId).style.display = 'block';
    };

    window.closeModal = function(modalId) {
        document.getElementById(modalId).style.display = 'none';
        document.getElementById('loginMessage').textContent = '';
        document.getElementById('registerMessage').textContent = '';
    };

    window.showRegister = function() {
        closeModal('loginModal');
        openModal('registerModal');
    };

    window.showLogin = function() {
        closeModal('registerModal');
        openModal('loginModal');
    };

    // Đóng modal khi click ra ngoài
    window.onclick = function(event) {
        if (event.target == loginModal) {
            closeModal('loginModal');
        }
        if (event.target == registerModal) {
            closeModal('registerModal');
        }
    };


    // ===================================
    // 2. LOGIC ĐĂNG KÝ (MÔ PHỎNG)
    // ===================================
    registerForm.addEventListener('submit', function(e) {
        e.preventDefault();
        const username = document.getElementById('regUsername').value;
        const password = document.getElementById('regPassword').value;
        const confirmPass = document.getElementById('regConfirmPassword').value;
        const msg = document.getElementById('registerMessage');

        if (password !== confirmPass) {
            msg.textContent = "Lỗi: Mật khẩu xác nhận không khớp.";
            msg.style.color = 'red';
            return;
        }

        msg.textContent = `Đang đăng ký tài khoản ${username}...`;
        msg.style.color = 'yellow';

        // Mô phỏng quá trình gửi dữ liệu lên server
        setTimeout(() => {
            msg.textContent = "Đăng ký thành công! Vui lòng đăng nhập.";
            msg.style.color = 'green';
            registerForm.reset();
            
            // Tự động chuyển sang form đăng nhập sau 2 giây
            setTimeout(() => {
                showLogin();
            }, 2000);
            
        }, 1500);
    });

    // ===================================
    // 3. LOGIC ĐĂNG NHẬP (MÔ PHỎNG)
    // ===================================
    loginForm.addEventListener('submit', function(e) {
        e.preventDefault();
        const username = document.getElementById('loginUsername').value;
        const password = document.getElementById('loginPassword').value;
        const msg = document.getElementById('loginMessage');

        // Logic kiểm tra mô phỏng
        if (username === "testuser" && password === "123456") {
            msg.textContent = "Đăng nhập thành công! Đang chuyển hướng...";
            msg.style.color = 'green';
            
            // Cập nhật trạng thái
            isLoggedIn = true;
            currentUsername = username;
            userBalance = 50000; // Gán số dư mô phỏng
            
            setTimeout(() => {
                closeModal('loginModal');
                updateUI(); // Cập nhật giao diện Header
            }, 1000);
            
        } else {
            msg.textContent = "Lỗi: Tên đăng nhập hoặc mật khẩu không đúng. (Mô phỏng: testuser/123456)";
            msg.style.color = 'red';
        }
    });

    // ===================================
    // 4. CẬP NHẬT GIAO DIỆN SAU ĐĂNG NHẬP
    // ===================================
    function updateUI() {
        if (isLoggedIn) {
            // Hiển thị tên và nút Đăng xuất
            userActionsContainer.innerHTML = `
                <div class="user-info-display">
                    <span style="color:#FFD700; margin-right: 15px; font-weight: bold;">
                        <i class="fas fa-user-circle"></i> ${currentUsername}
                    </span>
                    <button class="btn btn-logout" onclick="logout()"><i class="fas fa-sign-out-alt"></i> Đăng Xuất</button>
                </div>
            `;
            // Cập nhật số dư ở thanh thông tin
            userBalanceSpan.textContent = `${userBalance.toLocaleString('vi-VN')} Đ`;
        } else {
            // Hiển thị nút Đăng nhập/Đăng ký
            userActionsContainer.innerHTML = `
                <button class="btn btn-login" onclick="openModal('loginModal')"><i class="fas fa-sign-in-alt"></i> Đăng Nhập</button>
                <button class="btn btn-register" onclick="openModal('registerModal')"><i class="fas fa-user-plus"></i> Đăng Ký</button>
            `;
            // Reset số dư
            userBalanceSpan.textContent = `0 Đ`;
        }
    }

    // ===================================
    // 5. CHỨC NĂNG ĐĂNG XUẤT
    // ===================================
    window.logout = function() {
        isLoggedIn = false;
        currentUsername = "Khách";
        userBalance = 0;
        alert("Đã đăng xuất thành công!");
        updateUI();
    };


    // Các chức năng khác từ code cũ (Giữ lại)
    window.openPayment = function(){
        alert("Tính năng nạp tiền trực tiếp đang trong quá trình tích hợp. Vui lòng liên hệ trực tiếp.");
    };
    // ... (Thêm các hàm khác nếu có, ví dụ: toggleMenu, handleFormSubmit...)
    
});
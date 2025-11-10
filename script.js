document.addEventListener('DOMContentLoaded', function() {
    
    // ===================================
    // KHAI BÁO VÀ KHỞI TẠO TRẠNG THÁI
    // ===================================
    let isLoggedIn = false;
    let currentUsername = "Khách";
    let userBalance = 0; 

    const userActionsContainer = document.getElementById('userActions');
    const userBalanceSpan = document.getElementById('userBalance');
    const loginModal = document.getElementById('loginModal');
    const registerModal = document.getElementById('registerModal');
    const loginForm = document.getElementById('loginForm');
    const registerForm = document.getElementById('registerForm');
    const buyButtons = document.querySelectorAll('.btn-buy');
    
    // Gọi hàm để thiết lập giao diện ban đầu
    updateUI(); 

    // ===================================
    // 1. QUẢN LÝ MODAL (POP-UP)
    // ===================================

    window.openModal = function(modalId) {
        document.getElementById(modalId).style.display = 'flex'; // Dùng flex để căn giữa
    };

    window.closeModal = function(modalId) {
        document.getElementById(modalId).style.display = 'none';
        // Reset thông báo lỗi
        document.getElementById('loginMessage').textContent = '';
        document.getElementById('registerMessage').textContent = '';
    };

    // Chuyển đổi giữa hai Modals
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
        const password = document.getElementById('regPassword').value;
        const confirmPass = document.getElementById('regConfirmPassword').value;
        const msg = document.getElementById('registerMessage');

        if (password !== confirmPass) {
            msg.textContent = "Lỗi: Mật khẩu xác nhận không khớp.";
            msg.style.color = 'red';
            return;
        }

        // Mô phỏng thành công (không có server)
        msg.textContent = "Đăng ký thành công! Đang chuyển sang Đăng nhập...";
        msg.style.color = 'green';
        registerForm.reset();
        
        setTimeout(() => {
            showLogin();
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

        // Mô phỏng kiểm tra (Tài khoản mẫu: testuser/123456)
        if (username === "testuser" && password === "123456") {
            msg.textContent = "Đăng nhập thành công! Chào mừng...";
            msg.style.color = 'green';
            
            isLoggedIn = true;
            currentUsername = username;
            userBalance = 50000; 
            
            setTimeout(() => {
                closeModal('loginModal');
                updateUI(); // Cập nhật Header
            }, 1000);
            
        } else {
            msg.textContent = "Sai: Tên đăng nhập hoặc mật khẩu không đúng.";
            msg.style.color = 'red';
        }
    });

    // ===================================
    // 4. CẬP NHẬT GIAO DIỆN SAU ĐĂNG NHẬP
    // ===================================
    function updateUI() {
        if (isLoggedIn) {
            // Giao diện khi đã đăng nhập
            userActionsContainer.innerHTML = `
                <div class="user-info-display">
                    <span style="color:#FFD700; margin-right: 15px; font-weight: bold;">
                        <i class="fas fa-user-circle"></i> ${currentUsername}
                    </span>
                    <button class="btn btn-logout" onclick="logout()"><i class="fas fa-sign-out-alt"></i> Đăng Xuất</button>
                </div>
            `;
            userBalanceSpan.textContent = `${userBalance.toLocaleString('vi-VN')} Đ`;
        } else {
            // Giao diện khi chưa đăng nhập
            userActionsContainer.innerHTML = `
                <button class="btn btn-login" onclick="openModal('loginModal')"><i class="fas fa-sign-in-alt"></i> Đăng Nhập</button>
                <button class="btn btn-register" onclick="openModal('registerModal')"><i class="fas fa-user-plus"></i> Đăng Ký</button>
            `;
            userBalanceSpan.textContent = `0 Đ`;
        }
    }

    // ===================================
    // 5. CÁC CHỨC NĂNG NÚT KHÁC (MÔ PHỎNG)
    // ===================================
    window.logout = function() {
        isLoggedIn = false;
        currentUsername = "Khách";
        userBalance = 0;
        alert("Đã đăng xuất thành công!");
        updateUI();
    };

    window.openPayment = function(){
        if (!isLoggedIn) {
            alert("Vui lòng đăng nhập để nạp tiền!");
            openModal('loginModal');
            return;
        }
        // Mô phỏng nạp thành công
        userBalance += 100000; // Nạp thêm 100k
        updateUI();
        alert(`Nạp tiền thành công! Số dư mới: ${userBalance.toLocaleString('vi-VN')} Đ`);
    };
    
    buyButtons.forEach(button => {
        button.addEventListener('click', function() {
            if (!isLoggedIn) {
                alert("Vui lòng đăng nhập để mua dịch vụ!");
                openModal('loginModal');
                return;
            }
            const productName = this.closest('.product-card').querySelector('h3').textContent;
            // Mô phỏng mua hàng thành công
            alert(`Bạn đã mua thành công dịch vụ: ${productName}. Chi tiết sẽ được gửi qua email/hệ thống.`);
        });
    });
});
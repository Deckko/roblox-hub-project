// ===================================
// 1. CHỨC NĂNG MENU DI ĐỘNG (HAMBURGER)
// ===================================
function toggleMenu() {
    const nav = document.getElementById('mainNav');
    // Khi nhấn, chuyển đổi class 'active' (đã định nghĩa trong style.css)
    nav.classList.toggle('active');
}


// ===================================
// 2. CHỨC NĂNG XỬ LÝ FORM LIÊN HỆ
// ===================================
function handleFormSubmit(event) {
    // Ngăn chặn form gửi đi theo cách truyền thống (tải lại trang)
    event.preventDefault(); 
    
    const name = document.getElementById('contactName').value.trim();
    const email = document.getElementById('contactEmail').value.trim();
    const message = document.getElementById('contactMessage').value.trim();
    const formMessage = document.getElementById('formMessage');

    // Kiểm tra xác thực đầu vào cơ bản
    if (!name || !email || !message) {
        formMessage.textContent = "Vui lòng điền đầy đủ các trường bắt buộc.";
        formMessage.style.color = 'red';
        return;
    }

    // Mô phỏng hành động gửi dữ liệu
    formMessage.textContent = "Đang gửi thông tin...";
    formMessage.style.color = '#4e54c8';

    // Mô phỏng độ trễ của việc gửi đi (2 giây)
    setTimeout(() => {
        // Xử lý thành công
        formMessage.textContent = "🎉 Cảm ơn bạn! Tin nhắn đã được gửi thành công, chúng tôi sẽ phản hồi sớm nhất.";
        formMessage.style.color = 'green';
        
        // Xóa nội dung form sau khi gửi
        document.getElementById('contactForm').reset();
    }, 2000);
}


// ===================================
// 3. CHỨC NĂNG CHAT BOX (HỘP TRÒ CHUYỆN)
// ===================================
function toggleChat(){
    const box = document.getElementById('chatBox');
    // Chuyển đổi trạng thái thu nhỏ (minimized)
    box.classList.toggle('minimized');
    
    const messages = document.getElementById('chatMessages');
    const inputContainer = document.querySelector('.chat-input');
    
    // Ẩn/hiện nội dung và khu vực nhập liệu
    if (box.classList.contains('minimized')) {
        messages.style.display = 'none';
        inputContainer.style.display = 'none';
    } else {
        messages.style.display = 'block';
        inputContainer.style.display = 'flex';
        messages.scrollTop = messages.scrollHeight; // Cuộn xuống cuối
    }
}

function sendMessage(){
    const input = document.getElementById('chatInput');
    const msg = input.value.trim();
    if(msg==='') return;
    
    const messages = document.getElementById('chatMessages');
    
    // Hiển thị tin nhắn của người dùng
    const userMsg = document.createElement('p');
    userMsg.textContent = "Bạn: " + msg;
    userMsg.style.textAlign = 'right';
    userMsg.style.color = '#4e54c8';
    messages.appendChild(userMsg);
    input.value='';
    messages.scrollTop = messages.scrollHeight; // Cuộn xuống cuối
    
    // Mô phỏng phản hồi tự động của hệ thống
    setTimeout(()=>{
        const r = document.createElement('p');
        r.textContent = "Hệ thống: Cảm ơn bạn đã liên hệ, chúng tôi đã nhận được tin nhắn và sẽ trả lời sớm nhất!";
        r.style.textAlign = 'left';
        r.style.color = '#333';
        messages.appendChild(r);
        messages.scrollTop = messages.scrollHeight;
    }, 1500);
}

// ===================================
// 4. CHỨC NĂNG KHÁC
// ===================================

// Hàm placeholder cho Nạp tiền
function openPayment(){
    alert("Tính năng nạp tiền trực tiếp đang trong quá trình tích hợp. Vui lòng liên hệ trực tiếp qua Chat hoặc Zalo.");
}

// Khởi tạo Swiper Carousel
document.addEventListener('DOMContentLoaded', function() {
    const swiper = new Swiper(".mySwiper", {
        slidesPerView: 1,
        spaceBetween: 20,
        loop:true,
        pagination:{el:".swiper-pagination",clickable:true},
        breakpoints:{
            640:{slidesPerView:2},
            1024:{slidesPerView:3}
        }
    });
});
🏢 Hệ Thống Quản Lý Chung Cư Thông Minh (Chung_Cu_Smart)
Dự án Chung_Cu_Smart là giải pháp quản lý chung cư hiện đại, được thiết kế để số hóa quy trình vận hành, theo dõi trạng thái thiết bị và quản lý hóa đơn cư dân một cách tự động, hiệu quả.

🚀 Các tính năng chính
Quản Lý Tổng Quan: Theo dõi số lượng phòng, trạng thái phòng (Đang thuê, Trống, Bảo trì) theo thời gian thực.

Điều Khiển SmartHome: Tích hợp điều khiển hệ thống chiếu sáng và điều hòa không khí cho từng phòng.

Quản Lý Cư Dân: Lưu trữ thông tin, lịch sử cư trú và dữ liệu liên hệ của cư dân.

Quản Lý Tài Chính: Tự động hóa việc tạo và theo dõi hóa đơn điện/nước hàng tháng.

Giao Diện Trực Quan: Bảng điều khiển (Dashboard) tối giản, chuyên nghiệp, hỗ trợ quản lý tập trung.

🛠 Công nghệ sử dụng
Frontend: HTML5, CSS3, JavaScript (Vanilla).

Backend & Database: Supabase (PostgreSQL & API Services).

Hosting: GitHub Pages.

⚙️ Cấu trúc dữ liệu Database (Supabase)
Hệ thống sử dụng 3 bảng chính:

rooms: Lưu trữ thông tin phòng, trạng thái thiết bị (điện, điều hòa).

residents: Lưu trữ thông tin cá nhân và lịch sử cư dân.

bills: Lưu trữ dữ liệu hóa đơn, điện năng tiêu thụ và trạng thái thanh toán.

🚀 Hướng dẫn triển khai
Clone dự án về máy hoặc fork từ repository này.

Thiết lập Supabase:

Tạo project mới trên Supabase.

Sử dụng đoạn mã SQL trong file database.sql (nếu có) hoặc chạy lệnh khởi tạo các bảng rooms, residents, bills trong SQL Editor.

Thiết lập Row Level Security (RLS) cho các bảng (Enable INSERT, SELECT, UPDATE).

Kết nối API:

Lấy Project URL và ANON_PUBLIC_KEY từ mục Project Settings > API.

Thay thế vào phần cấu hình Supabase trong file index.html.

Triển khai: Đẩy code lên GitHub và kích hoạt GitHub Pages trong phần Settings.

📸 Hình ảnh hệ thống
(Bạn hãy tải các ảnh chụp màn hình từ project của mình lên thư mục assets hoặc images rồi chèn vào đây)

👨‍💻 Tác giả
Đàm Thế Tuyên

Liên hệ: damthetuyen@gmai.com

Dự án được xây dựng với mục tiêu tối ưu hóa vận hành chung cư thời đại 4.0.
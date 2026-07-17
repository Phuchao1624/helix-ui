# HELIX full UI route inventory

Kiểm kê từ `src/App.jsx`, bao gồm route động, redirect/fallback và các view lớn được render theo tab/wizard. Ngày kiểm tra: 18/07/2026.

| STT | Route / View | Role | Tên màn hình | Primary task | Trạng thái hiện tại | Đã redesign | Desktop checked | Tablet checked | Mobile checked |
|-----|--------------|------|--------------|--------------|---------------------|-------------|-----------------|----------------|----------------|
| 1 | `/` | Shared | Root redirect | Điều hướng vào Welcome | Redirect | Có | Có | Có | Có |
| 2 | `/welcome` | Shared | Welcome | Hiểu sản phẩm và đăng nhập | Production | Có | Có | Có | Có |
| 3 | `/login` | Auth | Login | Đăng nhập theo vai trò | Production | Có | Có | Có | Có |
| 4 | `/forgot-password` | Auth | Forgot password | Khôi phục quyền truy cập | Production | Có | Có | Có | Có |
| 5 | `/first-login` | Auth | First login setup | Thiết lập tài khoản lần đầu | Production | Có | Có | Có | Có |
| 6 | `/profile` · Profile | Shared | Hồ sơ cá nhân | Cập nhật thông tin | Production | Có | Có | Có | Có |
| 7 | `/profile` · Security | Shared | Bảo mật | Đổi mật khẩu | Production | Có | Có | Có | Có |
| 8 | `/profile` · Preferences | Shared | Tuỳ chọn | Quản lý thông báo | Production | Có | Có | Có | Có |
| 9 | `/notifications` · All | Shared | Tất cả thông báo | Theo dõi cập nhật | Production | Có | Có | Có | Có |
| 10 | `/notifications` · Unread | Shared | Chưa đọc | Xử lý cập nhật mới | Production | Có | Có | Có | Có |
| 11 | `/:role/wallet` | Shared | Token wallet | Xem, mua và theo dõi token | Production | Có | Có | Có | Có |
| 12 | `/admin` | Admin | Tổng quan hệ thống | Theo dõi vận hành | Production | Có | Có | Có | Có |
| 13 | `/admin/users` · All | Admin | Quản lý người dùng | Tìm và quản lý tài khoản | Production | Có | Có | Có | Có |
| 14 | `/admin/users` · Active/Pending/Inactive | Admin | Lọc người dùng | Xử lý theo trạng thái | Production | Có | Có | Có | Có |
| 15 | `/admin/users/new` | Admin | Tạo người dùng | Tạo và mời tài khoản | Production | Có | Có | Có | Có |
| 16 | `/admin/users/import` · Upload | Admin | Import CSV | Tải danh sách | Production | Có | Có | Có | Có |
| 17 | `/admin/users/import` · Validate | Admin | Kiểm tra import | Sửa hoặc bỏ qua dòng lỗi | Production | Có | Có | Có | Có |
| 18 | `/admin/users/import` · Result | Admin | Kết quả import | Xác nhận kết quả | Production | Có | Có | Có | Có |
| 19 | `/admin/config` · Email | Admin | Cấu hình email | Quản lý email hệ thống | Production | Có | Có | Có | Có |
| 20 | `/admin/config` · File | Admin | Cấu hình tệp | Quản lý giới hạn upload | Production | Có | Có | Có | Có |
| 21 | `/admin/config` · Notification | Admin | Cấu hình thông báo | Chọn kênh thông báo | Production | Có | Có | Có | Có |
| 22 | `/admin/config` · Feature | Admin | Feature flags | Bật/tắt tính năng | Production | Có | Có | Có | Có |
| 23 | `/admin/config` · Attendance | Admin | Quy tắc điểm danh | Cấu hình nghiệp vụ | Production | Có | Có | Có | Có |
| 24 | `/coordinator` | Coordinator | Tổng quan điều phối | Xử lý chương trình và lớp | Production | Có | Có | Có | Có |
| 25 | `/coordinator/programs` | Coordinator | Chương trình | Tìm, tạo, theo dõi chương trình | Production | Có | Có | Có | Có |
| 26 | `/coordinator/programs/:programId` | Coordinator | Chi tiết chương trình | Điều phối course/class/enrollment | Production | Có | Có | Có | Có |
| 27 | `/coordinator/courses` | Coordinator | Khoá học | Quản lý cấu trúc course | Production | Có | Có | Có | Có |
| 28 | `/coordinator/classes` | Coordinator | Lớp học | Quản lý lịch và mentor | Production | Có | Có | Có | Có |
| 29 | `/coordinator/enrollment` | Coordinator | Ghi danh | Thêm/chuyển học sinh | Production | Có | Có | Có | Có |
| 30 | `/mentor` | Mentor | Tổng quan Mentor | Tiếp tục luồng dạy hôm nay | Production | Có | Có | Có | Có |
| 31 | `/mentor/classes` | Mentor | Lớp của tôi | Theo dõi sức khoẻ lớp | Production | Có | Có | Có | Có |
| 32 | `/mentor/classes/:classId` · Sessions | Mentor | Chi tiết lớp · Buổi học | Vận hành session | Production | Có | Có | Có | Có |
| 33 | `/mentor/classes/:classId` · Students | Mentor | Chi tiết lớp · Học sinh | Theo dõi roster | Production | Có | Có | Có | Có |
| 34 | `/mentor/classes/:classId` · Assignments | Mentor | Chi tiết lớp · Bài tập | Theo dõi submission | Production | Có | Có | Có | Có |
| 35 | `/mentor/classes/:classId` · Attendance | Mentor | Chi tiết lớp · Chuyên cần | Xem attendance | Production | Có | Có | Có | Có |
| 36 | `/mentor/classes/:classId` · Materials | Mentor | Chi tiết lớp · Học liệu | Xem resource | Production | Có | Có | Có | Có |
| 37 | `/mentor/session` | Mentor | Quản lý buổi học | Chuẩn bị và hoàn tất session | Production | Có | Có | Có | Có |
| 38 | `/mentor/attendance` | Mentor | Điểm danh | Ghi và lưu chuyên cần | Production | Có | Có | Có | Có |
| 39 | `/mentor/materials` | Mentor | Thư viện học liệu | Tìm và upload resource | Production | Có | Có | Có | Có |
| 40 | `/mentor/assignments` | Mentor | Quản lý bài tập | Tạo và theo dõi bài | Production | Có | Có | Có | Có |
| 41 | `/mentor/grading` | Mentor | Chấm bài | Chấm theo submission queue | Production | Có | Có | Có | Có |
| 42 | `/mentor/meet` | Mentor | Meet & Attendance | Tạo phòng và theo dõi attendance | Production | Có | Có | Có | Có |
| 43 | `/student` | Student | Hôm nay | Chọn hành động học tiếp theo | Production | Có | Có | Có | Có |
| 44 | `/student/courses` | Student | Khoá học của tôi | Tiếp tục course hiện tại | Production | Có | Có | Có | Có |
| 45 | `/student/sessions` · Upcoming | Student | Buổi học sắp tới | Chuẩn bị và tham gia lớp | Production | Có | Có | Có | Có |
| 46 | `/student/sessions` · Completed | Student | Lịch sử buổi học | Xem recording và học liệu | Production | Có | Có | Có | Có |
| 47 | `/student/assignments` · All | Student | Bài tập | Tìm việc ưu tiên | Production | Có | Có | Có | Có |
| 48 | `/student/assignments` · To do | Student | Bài cần làm | Xử lý deadline | Production | Có | Có | Có | Có |
| 49 | `/student/assignments` · Submitted | Student | Bài đã nộp | Theo dõi trạng thái | Production | Có | Có | Có | Có |
| 50 | `/student/assignments` · Graded | Student | Bài đã chấm | Mở điểm và feedback | Production | Có | Có | Có | Có |
| 51 | `/student/assignments/:assignmentId` | Student | Nộp bài | Đọc brief và submit | Production | Có | Có | Có | Có |
| 52 | `/student/grades/:assignmentId` | Student | Điểm & nhận xét | Hiểu feedback và trao đổi | Production | Có | Có | Có | Có |
| 53 | `/student/ai` | Student | AI Practice | Luyện tập theo skill | Production | Có | Có | Có | Có |
| 54 | `/student/assessments` | Student | Tests & Review | Làm test và ôn lỗi | Production | Có | Có | Có | Có |
| 55 | `/:role/ai`, `/:role/assessments` non-student | Shared | Role guard | Chặn quyền sai vai trò | Redirect bảo vệ | Có | Có | Có | Có |
| 56 | `*` | Shared | Not found fallback | Trở về Student Home | Redirect | Có | Có | Có | Có |

## Kết quả

- Tổng route/view: **56**.
- Đã redesign: **56/56 (100%)**.
- Mọi CSS mới cho ứng dụng đã được scope dưới `.route-canvas`; Header không nằm trong canvas này.
- Screenshot đa viewport: `artifacts/final/<route>-desktop.png`, `-tablet.png`, `-mobile.png` (tên route được slug hoá).

# SOFTWARE REQUIREMENTS SPECIFICATION (SRS)

**Ứng dụng Nhật ký món ăn – Hội viên nhóm dinh dưỡng**  
Phiên bản 1.0 – Soạn thảo ngày 17/10/2025

---

## 1. Introduction – Giới thiệu

### 1.1 Purpose

Tài liệu này mô tả đặc tả yêu cầu phần mềm cho ứng dụng di động “Nhật ký món ăn – Hội viên nhóm dinh dưỡng”.  
Ứng dụng được phát triển nhằm giúp hội viên ghi lại, theo dõi và phân tích chế độ ăn, lượng calo, và tiến độ sức khỏe của bản thân.  
Đồng thời, hỗ trợ kết nối hội viên với huấn luyện viên và cộng đồng dinh dưỡng nhằm nâng cao hiệu quả đạt mục tiêu.

### 1.2 Scope

Ứng dụng di động miễn phí giúp hội viên ghi nhật ký món ăn, lượng nước, cân nặng, calo và chỉ số dinh dưỡng (macro, micro, GI).  
Trợ lý ảo gợi ý thực đơn, nhắc nhở, gắn huy hiệu, kết nối nhóm dinh dưỡng và cung cấp hệ sinh thái cộng đồng (Zalo, Facebook, offline).

### 1.3 Definitions, Acronyms, and Abbreviations

- **Macro** – Thành phần dinh dưỡng đa lượng (Protein, Carbohydrate, Fat).
- **GI** – Glycemic Index: Chỉ số đường huyết của thực phẩm.
- **Hội viên** – Người tham gia nhóm dinh dưỡng có tài khoản hợp lệ.
- **Trợ lý ảo** – Bot AI tích hợp trong ứng dụng hỗ trợ tư vấn và nhắc nhở.

### 1.4 References

- IEEE Std 830-1998 – IEEE Recommended Practice for Software Requirements Specification.

### 1.5 Overview

Phần còn lại mô tả tổng quan sản phẩm, yêu cầu chi tiết, ràng buộc kỹ thuật và phụ lục mô hình hệ thống.

---

## 2. Overall Description – Mô tả tổng quát

### 2.1 Product Perspective

Ứng dụng là một phần của hệ sinh thái nhóm dinh dưỡng, gồm: cộng đồng Zalo/Facebook, hoạt động sinh hoạt hàng tháng,  
và ứng dụng di động hỗ trợ theo dõi dinh dưỡng. Ứng dụng hoạt động độc lập trên thiết bị di động và lưu dữ liệu trên cloud server.

### 2.2 Product Functions

- Ghi nhật ký món ăn (ảnh, tên, calo, macro, GI)
- Ghi nhật ký nước & cân nặng
- Trợ lý ảo nhắc nhở, gợi ý thực đơn
- Báo cáo cá nhân, biểu đồ tiến độ
- Kết nối nhóm dinh dưỡng, gửi báo cáo cho huấn luyện viên
- Gắn huy hiệu, thông báo tuyên dương
- Quản lý cộng đồng, hiển thị bài viết và sự kiện

### 2.3 User Characteristics

- **Hội viên:** người sử dụng chính, quan tâm đến sức khỏe và dinh dưỡng.
- **Huấn luyện viên:** theo dõi tiến độ và phản hồi cho hội viên.
- **Quản trị viên:** quản lý dữ liệu, hội viên và nội dung.

### 2.4 Constraints

- Ứng dụng native (Flutter/React Native)
- CSDL đám mây (Firebase/Supabase)
- Hỗ trợ Android ≥ 8, iOS ≥ 13
- Bảo mật theo chuẩn GDPR

### 2.5 Assumptions and Dependencies

- Người dùng có kết nối Internet
- Dữ liệu dinh dưỡng lấy từ API Bộ Y tế hoặc USDA
- Người dùng đồng ý chia sẻ dữ liệu với nhóm dinh dưỡng

---

## 3. Specific Requirements – Yêu cầu chi tiết

### 3.1 Functional Requirements (FR)

| ID    | Yêu cầu                    | Mô tả                                                            |
| ----- | -------------------------- | ---------------------------------------------------------------- |
| FR-01 | Đăng ký/Đăng nhập hội viên | Tạo tài khoản hoặc đăng nhập bằng số điện thoại / mạng xã hội.   |
| FR-02 | Ghi nhật ký món ăn         | Thêm món ăn (tên, ảnh, calo, macro, GI) và tính tổng năng lượng. |
| FR-03 | Nhật ký nước & cân nặng    | Nhập lượng nước (ml) và cân nặng (kg), hiển thị biểu đồ tiến độ. |
| FR-04 | Trợ lý ảo cá nhân          | Gợi ý thực đơn, nhắc nhở uống nước, cảnh báo vượt calo.          |
| FR-05 | Gợi ý theo bệnh lý         | Đưa ra chế độ ăn phù hợp với bệnh mạn tính.                      |
| FR-06 | Huy hiệu & tuyên dương     | Tự động gắn huy hiệu khi hội viên đạt mốc thành tích.            |
| FR-07 | Kết nối nhóm dinh dưỡng    | Gửi báo cáo tuần, nhận phản hồi qua ứng dụng.                    |
| FR-08 | Quản lý cộng đồng          | Liên kết nhóm Zalo/Facebook, hiển thị bài đăng mới.              |
| FR-09 | Quản trị hệ thống          | Admin thêm/xóa hội viên, duyệt nội dung, cập nhật dữ liệu.       |

### 3.2 Non-Functional Requirements (NFR)

| ID     | Thuộc tính    | Mô tả                                         |
| ------ | ------------- | --------------------------------------------- |
| NFR-01 | Hiệu năng     | Phản hồi ≤ 2 giây cho thao tác chính.         |
| NFR-02 | Tính sẵn sàng | Uptime ≥ 99% trong giờ hoạt động.             |
| NFR-03 | Bảo mật       | Mã hóa AES256, truyền HTTPS.                  |
| NFR-04 | Dễ sử dụng    | Giao diện thân thiện, phù hợp người >40 tuổi. |
| NFR-05 | Mở rộng       | Có thể tích hợp API thiết bị đeo tay.         |
| NFR-06 | Bảo trì       | Module hóa, có tài liệu hướng dẫn.            |
| NFR-07 | Đa ngôn ngữ   | Hỗ trợ tiếng Việt và tiếng Anh.               |

---

## 4. Appendices – Phụ lục

**Actor:** Hội viên, Huấn luyện viên, Admin.  
**Use Cases chính:**

- Hội viên ghi nhật ký món ăn, xem báo cáo, nhận gợi ý.
- Huấn luyện viên xem báo cáo hội viên.
- Admin quản lý dữ liệu.

**Prototype gợi ý:**

- Trang chính: nhật ký, tổng calo, biểu đồ.
- Tab Trợ lý: gợi ý bữa ăn.
- Tab Cộng đồng: nhóm FB/Zalo, sự kiện.
- Tab Cá nhân: huy hiệu, cài đặt.

---

## 5. Kết luận

Tài liệu SRS này mô tả chi tiết yêu cầu phần mềm cho ứng dụng “Nhật ký món ăn – Hội viên nhóm dinh dưỡng”.  
Đây là cơ sở cho việc thiết kế, lập trình và kiểm thử đảm bảo ứng dụng đáp ứng đúng mục tiêu sức khỏe, cá nhân hóa và kết nối cộng đồng.

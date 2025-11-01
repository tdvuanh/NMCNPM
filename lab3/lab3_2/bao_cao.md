## **Bước 1: Cài đặt SVN Client**

### 🔹 macOS

```bash
brew install subversion
```

**Kiểm tra cài đặt:**

```bash
svn --version
```

Nếu hiển thị thông tin phiên bản, SVN đã được cài thành công.

---

## **Bước 2: Tạo Repository cục bộ**

Tạo thư mục để chứa repository:

```bash
mkdir -p ~/svn/repos/demo
svnadmin create ~/svn/repos/demo
```

Tạo cấu trúc thư mục chuẩn trong repo:

```bash
svn mkdir -m "init layout" \
  file:///Users/username/svn/repos/demo/trunk \
  file:///Users/username/svn/repos/demo/branches \
  file:///Users/username/svn/repos/demo/tags
```

---

## **Bước 3: Checkout (lấy mã nguồn về)**

Tạo thư mục làm việc và lấy mã về từ repository:

```bash
mkdir -p ~/workspace/demo
cd ~/workspace/demo
svn checkout file:///Users/username/svn/repos/demo/trunk .
```

Hoặc viết ngắn gọn:

```bash
svn co file:///home/username/svn/repos/demo/trunk .
```

---

## **Bước 4: Thêm file và Commit (Check-in)**

Tạo file mới và thêm vào quản lý phiên bản:

```bash
echo "Hello SVN" > README.txt
svn add README.txt
```

Kiểm tra trạng thái:

```bash
svn status
# Ký hiệu 'A' nghĩa là file đang chờ được commit (Added)
```

Commit lên repository:

```bash
svn commit -m "init project"
```

---

## **Bước 5: Update (Đồng bộ thay đổi từ repo)**

Cập nhật thay đổi mới nhất từ repository về thư mục làm việc:

```bash
svn update
# hoặc svn up
```

---

## **Bước 6: So sánh phiên bản (Diff)**

So sánh file local với bản đã commit gần nhất:

```bash
svn diff README.txt
```

So sánh giữa hai phiên bản cụ thể (ví dụ: revision 1 và 2):

```bash
svn diff -r 1:2 README.txt
```

Xem khác biệt của toàn bộ thư mục:

```bash
svn diff -r PREV:HEAD
```

---

## **Bước 7: Xem log thay đổi (History)**

Hiển thị lịch sử commit:

```bash
svn log
```

Xem chi tiết kèm file thay đổi:

```bash
svn log -v
```

Giới hạn số bản ghi (ví dụ: 10 bản gần nhất):

```bash
svn log -l 10
```

Xem log của file cụ thể:

```bash
svn log README.txt
```

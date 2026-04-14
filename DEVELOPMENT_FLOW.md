# DEVELOPMENT FLOW — SWP391 (HireGo Prototype)

Tài liệu này giúp team hiểu:

- Dự án đang chạy như thế nào từ FE -> BE.
- Luồng xử lý request đi từ đâu tới đâu.
- Cách thêm tính năng mới để không bị rối code khi mở rộng theo sprint.

---

## 1) Kiến trúc hiện tại

Project tách 2 phần:

- `FE/`: React + Vite (JS/JSX)
- `BE/`: Node.js + Express (JS)

Mối quan hệ:

1. Người dùng thao tác trên UI ở `FE/src/pages/...`
2. FE gọi API qua `FE/src/lib/api.js`
3. BE nhận request tại `BE/src/index.js`
4. BE chuyển request tới route tương ứng trong `BE/src/routes/...`
5. Route xử lý dữ liệu (hiện tại dùng mock trong `BE/src/data/...`)
6. BE trả response chuẩn `{ code, timestamp, data, message?, errors? }`
7. FE nhận kết quả, render lại UI hoặc báo lỗi

---

## 2) Luồng chạy khi start dự án

### Backend

File chính: `BE/src/index.js`

Trình tự:

1. Load biến môi trường (`dotenv`)
2. Tạo app Express
3. Gắn middleware (`cors`, `express.json`)
4. Khai báo route:
   - `/health`
   - `/auth/*`
   - `/job/*`
5. Gắn error handler cuối cùng
6. `app.listen(PORT)`

### Frontend

File chính: `FE/src/main.jsx`

Trình tự:

1. Mount React app vào `#root`
2. Bọc bởi `AuthProvider` để quản lý đăng nhập
3. Load router từ `FE/src/routes/router.jsx`
4. Mỗi page gọi service khi cần dữ liệu

---

## 3) Luồng request mẫu (từ UI đến DB/mock)

Ví dụ: người dùng mở danh sách việc làm `/jobs`

1. `FE/src/pages/Jobs.jsx` load page
2. Gọi `jobService.search()` trong `FE/src/services/jobService.js`
3. Service gọi `api.get("/job", { params })` qua `FE/src/lib/api.js`
4. Request đến `BE/src/routes/job.routes.js` (`GET /job`)
5. Route lọc + phân trang dữ liệu mock (`BE/src/data/mockJobs.js`)
6. Route trả `ok(paginateResult)`
7. FE nhận dữ liệu và render danh sách

Ví dụ: đăng nhập demo

1. `FE/src/pages/Login.jsx` submit form
2. Gọi `signIn` trong `FE/src/context/AuthContext.jsx`
3. Gọi API `POST /auth/sign-in`
4. `BE/src/routes/auth.routes.js` tạo token giả lập
5. FE lưu token vào `localStorage`
6. Từ request sau, `FE/src/lib/api.js` tự gắn `Authorization`

---

## 4) Quy chuẩn thêm tính năng mới (khuyến nghị)

Khi thêm 1 feature, làm theo thứ tự này để dễ kiểm soát:

1. **Định nghĩa API contract trước**
   - Endpoint: method + path
   - Input: body/query/params
   - Output: `data` shape
2. **Làm BE trước**
   - Tạo route mới trong `BE/src/routes/xxx.routes.js`
   - Tách logic xử lý thành hàm rõ ràng (sau có thể tách service)
   - Trả response chuẩn
3. **Làm FE service**
   - Tạo hàm gọi API trong `FE/src/services/...`
4. **Làm FE page/component**
   - Gọi service, quản lý loading/error/state
5. **Test thủ công end-to-end**
   - Gọi API trực tiếp (Postman/cURL) -> test UI
6. **Commit nhỏ theo sprint/task**
   - Mỗi commit nên đại diện 1 phần việc rõ ràng

---

## 5) Blueprint thư mục khi mở rộng

### Backend (đề xuất)

Hiện tại route đang chứa phần lớn logic. Khi dự án lớn hơn, nên tách:

- `BE/src/routes/` -> chỉ nhận request + trả response
- `BE/src/services/` -> business logic
- `BE/src/repositories/` -> thao tác DB
- `BE/src/models/` -> schema/model
- `BE/src/validators/` -> validate input

Luồng chuẩn:

`Route -> Service -> Repository -> DB -> Service -> Route -> FE`

### Frontend (đề xuất)

- `FE/src/pages/` -> page-level
- `FE/src/components/` -> UI dùng lại
- `FE/src/services/` -> call API
- `FE/src/context/` hoặc state manager -> auth/global state
- `FE/src/types/` (nếu sau này quay lại TS)

Luồng chuẩn:

`Page -> Service -> API -> BE -> Service -> Page render`

---

## 6) Phạm vi đang KHÔNG làm (để tránh lệch mục tiêu)

Trong giai đoạn hiện tại:

- Không tích hợp OpenAI
- Không gợi ý việc làm AI
- Không AI schedule interview
- Không scan CV AI

Nếu cần “thay AI bằng luật thường”, làm rule-based ở service BE.

---

## 7) Checklist khi thêm module mới (copy dùng nhanh)

Ví dụ module `company`:

1. [ ] Tạo route `BE/src/routes/company.routes.js`
2. [ ] Mount route trong `BE/src/index.js` (`app.use("/company", companyRoutes)`)
3. [ ] (Nếu có DB) tạo model/repository/service
4. [ ] Tạo service FE `FE/src/services/companyService.js`
5. [ ] Tạo page FE `FE/src/pages/Company*.jsx`
6. [ ] Thêm route FE trong `FE/src/routes/router.jsx`
7. [ ] Test API + test UI
8. [ ] Cập nhật `cursor.md` + `README.md`

---

## 8) Chạy dự án nhanh

Terminal 1:

```bash
cd BE
npm run dev
```

Terminal 2:

```bash
cd FE
npm run dev
```

Nếu lỗi port 3000 bị chiếm:

- tìm PID: `netstat -ano | findstr :3000`
- kill PID: `taskkill /PID <PID> /F`

---

## 9) Định hướng sprint 8 ngày (gợi ý)

- Sprint 0 (đã có): dựng prototype FE/BE JS chạy được.
- Sprint 1: auth thật + DB + CRUD job cơ bản.
- Sprint 2: apply CV + company dashboard.
- Sprint 3: interview/manual workflow + polish UI + test + deploy.

Giữ nguyên tắc: làm chạy end-to-end từng phần nhỏ trước, rồi mới mở rộng.

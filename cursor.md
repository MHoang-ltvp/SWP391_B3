# Cursor / AI — ngữ cảnh dự án SWP391 (HireGo prototype)

File này giúp agent trong Cursor hiểu nhanh **mục tiêu, cấu trúc, quy ước** khi code thay đổi. Nên cập nhật khi team thêm module, đổi API, hoặc đổi hướng sprint.

## Tổng quan

- **Tên / domain:** HireGo — nền tảng tuyển dụng (prototype nhóm SWP391).
- **Mã nguồn gốc tham chiếu (không commit trong repo này):** `D:\SWP\` — `server/` (TypeScript + tsoa + MongoDB) và `webapp/` (TypeScript + Vite + React).
- **Repo hiện tại:** chỉ chứa **`BE/`** và **`FE/`** viết **JavaScript / JSX**, tách rõ backend và frontend.
- **Nguyên tắc sản phẩm:** **không** tích hợp tính năng AI (không OpenAI, không gợi ý việc làm AI, không lịch phỏng vấn AI, không scan CV bằng AI). Nếu port code từ `D:\SWP`, phải **bỏ hoặc thay** các phần đó.

## Cấu trúc thư mục

```
SWP391/
├── BE/                 # Express, port 3000 mặc định
│   ├── src/
│   │   ├── index.js    # bootstrap server, mount route
│   │   ├── routes/     # auth, job, …
│   │   ├── data/       # mock (sprint đầu); sau thay bằng DB
│   │   └── util/       # response chuẩn { code, timestamp, data }
│   └── .env.example
├── FE/                 # Vite + React 19, alias `@` → `src/`
│   └── src/
│       ├── main.jsx
│       ├── routes/
│       ├── pages/
│       ├── components/
│       ├── context/    # AuthContext (token localStorage)
│       ├── lib/api.js  # axios, baseURL từ VITE_API_URL
│       └── services/
└── cursor.md           # file này
```

## Stack & chạy local

| Phần | Công nghệ |
|------|-----------|
| BE | Node, Express, cors, dotenv — **chưa** MongoDB trong prototype đầu |
| FE | Vite 6, React 19, React Router 7, Tailwind 4 (`@tailwindcss/vite`), axios, sonner |

- **BE:** `cd BE && npm run dev` (hoặc `npm start`) — mặc định `http://localhost:3000`.
- **FE:** `cd FE && npm run dev` — cấu hình API: `FE/.env` với `VITE_API_URL=http://localhost:3000` (xem `FE/.env.example`).

## API prototype (BE)

Định dạng JSON thường dùng: `{ code, timestamp, data }` (lỗi có thể thêm `message` / `errors`).

| Method | Path | Ghi chú |
|--------|------|---------|
| GET | `/health` | kiểm tra sống |
| POST | `/auth/sign-in` | body `{ email, password }` — demo chấp nhận bất kỳ, trả token giả |
| GET | `/auth/profile` | header `Authorization: Bearer <token>` |
| GET | `/job` | query: `page`, `limit`, `keyword` — dữ liệu mock |
| GET | `/job/:id` | chi tiết mock |

Khi mở rộng: giữ **prefix và shape** tương thích với FE hoặc với bản `D:\SWP\server` để giảm đổi contract.

## FE — route & hành vi

- `/` — trang chủ giới thiệu prototype.
- `/jobs` — danh sách việc (gọi BE).
- `/jobs/:id` — chi tiết (HTML từ mock).
- `/login` — đăng nhập demo, lưu token + email qua `AuthContext` + `localStorage`.

**Không có** trang `/recommendations` hay service gợi ý AI.

## Quy ước khi sửa code

- **Ngôn ngữ:** BE dùng **`.js`**, FE dùng **`.jsx`** cho component; tránh thêm TypeScript trừ khi team thống nhất đổi hướng.
- **Phạm vi:** ưu tiên thay đổi nhỏ, đúng task; không refactor lan rộng không cần thiết.
- **Bảo mật:** không commit file `.env` có secret; dùng `.env.example` làm mẫu.
- **Port từ `D:\SWP`:** map từng module (auth, job, company, …), bỏ dependency `openai` và mọi endpoint/controller liên quan AI.

## Git & nhóm

- Remote GitHub (ví dụ): `MHoang-ltvp/SWP391_B3` — nhánh chính thường là `main`.
- Nếu **viết lại lịch sử** (squash, orphan, amend đã push): cần `git push --force-with-lease` và thông báo nhóm `git fetch && git reset --hard origin/main`.

## Việc nên làm khi sprint thay đổi

Cập nhật **mục này** trong `cursor.md`:

1. Module BE/FE mới hoặc route mới.
2. Biến môi trường bắt buộc.
3. Quyết định kiến trúc (Mongo, JWT, Redux, …) nếu khác prototype.

---

*Cập nhật lần cuối: giai đoạn prototype sprint 0 — một commit `first commit`, FE/BE JS, không AI.*

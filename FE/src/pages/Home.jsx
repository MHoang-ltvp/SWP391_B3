import { Link } from "react-router-dom";

export default function Home() {
  return (
    <div className="space-y-6">
      <section className="rounded-2xl bg-gradient-to-br from-indigo-600 to-violet-700 text-white p-10 shadow-lg">
        <h1 className="text-3xl font-bold tracking-tight">Nền tảng tuyển dụng HireGo</h1>
        <p className="mt-3 max-w-xl text-indigo-100">
          Đây là bản prototype đầu tiên (JavaScript): danh sách việc làm và đăng nhập demo. Không có gợi ý việc làm bằng AI —
          team sẽ mở rộng từng module theo sprint.
        </p>
        <div className="mt-6 flex flex-wrap gap-3">
          <Link
            to="/jobs"
            className="inline-flex rounded-lg bg-white px-4 py-2 text-sm font-medium text-indigo-700 shadow hover:bg-indigo-50"
          >
            Xem việc làm
          </Link>
          <Link
            to="/login"
            className="inline-flex rounded-lg border border-white/40 px-4 py-2 text-sm font-medium text-white hover:bg-white/10"
          >
            Đăng nhập demo
          </Link>
        </div>
      </section>
      <section className="rounded-xl border border-slate-200 bg-white p-6">
        <h2 className="font-semibold text-slate-800">Việc tiếp theo (gợi ý chia sprint)</h2>
        <ul className="mt-3 list-disc pl-5 text-sm text-slate-600 space-y-1">
          <li>Kết nối MongoDB + model giống bản TypeScript gốc</li>
          <li>Đăng ký, JWT thật, phân quyền ADMIN / COMPANY / USER</li>
          <li>Ứng tuyển, quản lý tin, phỏng vấn (không dùng AI lịch tự động)</li>
          <li>Thanh toán, chat realtime nếu cần</li>
        </ul>
      </section>
    </div>
  );
}

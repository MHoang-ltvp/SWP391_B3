import { Link } from "react-router-dom";

export default function HomePage() {
  return (
    <div className="space-y-6">
      <section className="rounded-2xl bg-gradient-to-br from-indigo-600 to-violet-700 text-white p-10 shadow-lg">
        <h1 className="text-3xl font-bold tracking-tight">Nền tảng tuyển dụng HireGo</h1>
        <p className="mt-3 max-w-2xl text-indigo-100">
          Bản prototype đã refactor theo cấu trúc backend/frontend rõ ràng. Có CRUD Job hoàn chỉnh để team triển khai
          thêm module theo sprint.
        </p>
        <div className="mt-6 flex flex-wrap gap-3">
          <Link
            to="/jobs"
            className="inline-flex rounded-lg bg-white px-4 py-2 text-sm font-medium text-indigo-700 shadow hover:bg-indigo-50"
          >
            Xem việc làm
          </Link>
          <Link
            to="/dashboard/jobs"
            className="inline-flex rounded-lg border border-white/40 px-4 py-2 text-sm font-medium text-white hover:bg-white/10"
          >
            Quản lý CRUD Job
          </Link>
        </div>
      </section>
    </div>
  );
}

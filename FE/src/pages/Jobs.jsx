import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { jobService } from "@/services/jobService.js";

export default function Jobs() {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [keyword, setKeyword] = useState("");
  const [page, setPage] = useState(1);
  const [data, setData] = useState({ items: [], total: 0, totalPages: 1 });

  useEffect(() => {
    let cancelled = false;
    (async () => {
      setLoading(true);
      setError("");
      try {
        const res = await jobService.search({ page, limit: 10, keyword: keyword || undefined });
        if (!cancelled) setData(res);
      } catch (e) {
        if (!cancelled) setError(e.message || "Không tải được danh sách");
      } finally {
        if (!cancelled) setLoading(false);
      }
    })();
    return () => {
      cancelled = true;
    };
  }, [page, keyword]);

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-slate-900">Việc làm</h1>
        <p className="text-sm text-slate-500 mt-1">Dữ liệu mẫu từ API prototype BE.</p>
      </div>
      <div className="flex flex-wrap gap-2 items-center">
        <input
          type="search"
          placeholder="Từ khóa (title, tên công ty)..."
          value={keyword}
          onChange={(e) => {
            setKeyword(e.target.value);
            setPage(1);
          }}
          className="flex-1 min-w-[200px] rounded-lg border border-slate-300 px-3 py-2 text-sm"
        />
      </div>
      {loading && <p className="text-slate-500">Đang tải…</p>}
      {error && <p className="text-red-600 text-sm">{error}</p>}
      {!loading && !error && (
        <ul className="space-y-3">
          {data.items.map((job) => (
            <li key={job.id}>
              <Link
                to={`/jobs/${job.id}`}
                className="block rounded-xl border border-slate-200 bg-white p-4 hover:border-indigo-300 hover:shadow-sm transition"
              >
                <div className="font-medium text-slate-900">{job.title}</div>
                <div className="text-sm text-slate-500 mt-1">
                  {job.company?.companyName}
                  {job.address?.city ? ` · ${job.address.city}` : ""}
                </div>
                {job.salaryMin != null && (
                  <div className="text-sm text-indigo-600 mt-2">
                    {job.salaryMin.toLocaleString("vi-VN")} –{" "}
                    {job.salaryMax?.toLocaleString("vi-VN")} đ/tháng
                  </div>
                )}
              </Link>
            </li>
          ))}
        </ul>
      )}
      {data.totalPages > 1 && (
        <div className="flex gap-2 justify-center pt-4">
          <button
            type="button"
            disabled={page <= 1}
            onClick={() => setPage((p) => p - 1)}
            className="rounded border px-3 py-1 text-sm disabled:opacity-40"
          >
            Trước
          </button>
          <span className="text-sm text-slate-600 self-center">
            Trang {page} / {data.totalPages}
          </span>
          <button
            type="button"
            disabled={page >= data.totalPages}
            onClick={() => setPage((p) => p + 1)}
            className="rounded border px-3 py-1 text-sm disabled:opacity-40"
          >
            Sau
          </button>
        </div>
      )}
    </div>
  );
}

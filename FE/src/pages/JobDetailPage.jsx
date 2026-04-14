import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { jobService } from "@/services/jobService";

export default function JobDetailPage() {
  const { id } = useParams();
  const [job, setJob] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    let cancelled = false;

    async function fetchDetail() {
      setLoading(true);
      setError("");
      try {
        const result = await jobService.detail(id);
        if (!cancelled) setJob(result);
      } catch (err) {
        if (!cancelled) setError(err.message || "Không tải được chi tiết");
      } finally {
        if (!cancelled) setLoading(false);
      }
    }

    fetchDetail();

    return () => {
      cancelled = true;
    };
  }, [id]);

  if (loading) return <p className="text-slate-500">Đang tải…</p>;

  if (error) {
    return (
      <div className="space-y-3">
        <p className="text-red-600">{error}</p>
        <Link to="/jobs" className="text-indigo-600 text-sm">
          ← Quay lại danh sách
        </Link>
      </div>
    );
  }

  if (!job) return null;

  return (
    <article className="space-y-6">
      <div>
        <Link to="/jobs" className="text-sm text-indigo-600 hover:underline">
          ← Việc làm
        </Link>
        <h1 className="text-2xl font-bold mt-2">{job.title}</h1>
        <p className="text-slate-600 mt-1">{job.company?.companyName}</p>
      </div>

      <div className="rounded-xl border border-slate-200 bg-white p-6 text-slate-800">
        {job.jobDetail?.content ? (
          <div dangerouslySetInnerHTML={{ __html: job.jobDetail.content }} />
        ) : (
          <p>Chưa có mô tả chi tiết.</p>
        )}
      </div>
    </article>
  );
}

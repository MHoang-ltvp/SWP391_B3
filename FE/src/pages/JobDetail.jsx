import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { jobService } from "@/services/jobService.js";

export default function JobDetail() {
  const { id } = useParams();
  const [job, setJob] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    let cancelled = false;
    (async () => {
      setLoading(true);
      setError("");
      try {
        const j = await jobService.getById(id);
        if (!cancelled) setJob(j);
      } catch (e) {
        if (!cancelled) setError(e.message || "Không tải được chi tiết");
      } finally {
        if (!cancelled) setLoading(false);
      }
    })();
    return () => {
      cancelled = true;
    };
  }, [id]);

  if (loading) return <p className="text-slate-500">Đang tải…</p>;
  if (error)
    return (
      <div className="space-y-3">
        <p className="text-red-600">{error}</p>
        <Link to="/jobs" className="text-indigo-600 text-sm">
          ← Quay lại danh sách
        </Link>
      </div>
    );
  if (!job) return null;

  return (
    <article className="space-y-6">
      <div>
        <Link to="/jobs" className="text-sm text-indigo-600 hover:underline">
          ← Việc làm
        </Link>
        <h1 className="text-2xl font-bold mt-2">{job.title}</h1>
        <p className="text-slate-600 mt-1">{job.company?.companyName}</p>
        {job.address && (
          <p className="text-sm text-slate-500">
            {job.address.ward}, {job.address.district}, {job.address.city}
          </p>
        )}
      </div>
      <div className="rounded-xl border border-slate-200 bg-white p-6 text-slate-800 [&_a]:text-indigo-600">
        <p className="text-sm text-amber-800 bg-amber-50 border border-amber-100 rounded-lg px-3 py-2 mb-4">
          Nút &quot;Ứng tuyển&quot; và luồng hồ sơ sẽ được làm ở sprint sau.
        </p>
        {job.jobDetail?.content && (
          <div dangerouslySetInnerHTML={{ __html: job.jobDetail.content }} />
        )}
        {job.jobDetail?.responsibilities && (
          <>
            <h3 className="text-lg font-semibold mt-6">Trách nhiệm</h3>
            <div dangerouslySetInnerHTML={{ __html: job.jobDetail.responsibilities }} />
          </>
        )}
        {job.jobDetail?.requirements && (
          <>
            <h3 className="text-lg font-semibold mt-6">Yêu cầu</h3>
            <div dangerouslySetInnerHTML={{ __html: job.jobDetail.requirements }} />
          </>
        )}
      </div>
    </article>
  );
}

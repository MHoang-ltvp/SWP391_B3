import { useEffect, useMemo, useState } from "react";
import { toast } from "sonner";
import { jobService } from "@/services/jobService";

const initialForm = {
  title: "",
  subTitle: "",
  companyName: "",
  city: "",
  district: "",
  ward: "",
  salaryMin: "",
  salaryMax: "",
  status: "ACTIVE",
  content: "",
  requirements: "",
  responsibilities: "",
};

export default function JobManagePage() {
  const [jobs, setJobs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [editingId, setEditingId] = useState("");
  const [form, setForm] = useState(initialForm);

  async function loadJobs() {
    setLoading(true);
    try {
      const result = await jobService.list({ page: 1, limit: 100 });
      setJobs(result.items || []);
    } catch (err) {
      toast.error(err.message || "Không tải được danh sách job");
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    loadJobs();
  }, []);

  const isEditing = useMemo(() => Boolean(editingId), [editingId]);

  function onChange(e) {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  }

  function startEdit(item) {
    setEditingId(item.id);
    setForm({
      title: item.title || "",
      subTitle: item.subTitle || "",
      companyName: item.company?.companyName || "",
      city: item.address?.city || "",
      district: item.address?.district || "",
      ward: item.address?.ward || "",
      salaryMin: item.salaryMin ?? "",
      salaryMax: item.salaryMax ?? "",
      status: item.status || "ACTIVE",
      content: item.jobDetail?.content || "",
      requirements: item.jobDetail?.requirements || "",
      responsibilities: item.jobDetail?.responsibilities || "",
    });
  }

  function resetForm() {
    setEditingId("");
    setForm(initialForm);
  }

  async function onSubmit(e) {
    e.preventDefault();
    setSaving(true);
    try {
      if (isEditing) {
        await jobService.update(editingId, form);
        toast.success("Cập nhật job thành công");
      } else {
        await jobService.create(form);
        toast.success("Tạo job thành công");
      }
      resetForm();
      await loadJobs();
    } catch (err) {
      toast.error(err.message || "Lưu thất bại");
    } finally {
      setSaving(false);
    }
  }

  async function removeJob(id) {
    const confirmed = window.confirm("Xóa job này?");
    if (!confirmed) return;

    try {
      await jobService.remove(id);
      toast.success("Xóa job thành công");
      if (editingId === id) resetForm();
      await loadJobs();
    } catch (err) {
      toast.error(err.message || "Xóa thất bại");
    }
  }

  return (
    <div className="grid gap-6 lg:grid-cols-[1.1fr_1fr]">
      <section className="rounded-xl border border-slate-200 bg-white p-5">
        <h2 className="text-lg font-semibold mb-4">
          {isEditing ? "Cập nhật job" : "Tạo job mới"}
        </h2>
        <form onSubmit={onSubmit} className="space-y-3">
          <input name="title" value={form.title} onChange={onChange} required placeholder="Tiêu đề" className="w-full rounded border px-3 py-2 text-sm" />
          <input name="subTitle" value={form.subTitle} onChange={onChange} placeholder="Phụ đề" className="w-full rounded border px-3 py-2 text-sm" />
          <input name="companyName" value={form.companyName} onChange={onChange} placeholder="Tên công ty" className="w-full rounded border px-3 py-2 text-sm" />
          <div className="grid grid-cols-3 gap-2">
            <input name="city" value={form.city} onChange={onChange} placeholder="Thành phố" className="rounded border px-3 py-2 text-sm" />
            <input name="district" value={form.district} onChange={onChange} placeholder="Quận/Huyện" className="rounded border px-3 py-2 text-sm" />
            <input name="ward" value={form.ward} onChange={onChange} placeholder="Phường/Xã" className="rounded border px-3 py-2 text-sm" />
          </div>
          <div className="grid grid-cols-2 gap-2">
            <input name="salaryMin" value={form.salaryMin} onChange={onChange} placeholder="Lương từ" className="rounded border px-3 py-2 text-sm" />
            <input name="salaryMax" value={form.salaryMax} onChange={onChange} placeholder="Lương đến" className="rounded border px-3 py-2 text-sm" />
          </div>
          <select name="status" value={form.status} onChange={onChange} className="w-full rounded border px-3 py-2 text-sm">
            <option value="ACTIVE">ACTIVE</option>
            <option value="INACTIVE">INACTIVE</option>
            <option value="DRAFT">DRAFT</option>
          </select>
          <textarea name="content" value={form.content} onChange={onChange} placeholder="Mô tả HTML hoặc text" rows={3} className="w-full rounded border px-3 py-2 text-sm" />
          <textarea name="requirements" value={form.requirements} onChange={onChange} placeholder="Yêu cầu" rows={2} className="w-full rounded border px-3 py-2 text-sm" />
          <textarea name="responsibilities" value={form.responsibilities} onChange={onChange} placeholder="Trách nhiệm" rows={2} className="w-full rounded border px-3 py-2 text-sm" />

          <div className="flex gap-2">
            <button type="submit" disabled={saving} className="rounded bg-indigo-600 text-white px-4 py-2 text-sm disabled:opacity-60">
              {saving ? "Đang lưu..." : isEditing ? "Lưu cập nhật" : "Tạo mới"}
            </button>
            {isEditing && (
              <button type="button" onClick={resetForm} className="rounded border px-4 py-2 text-sm">
                Hủy sửa
              </button>
            )}
          </div>
        </form>
      </section>

      <section className="rounded-xl border border-slate-200 bg-white p-5">
        <h2 className="text-lg font-semibold mb-4">Danh sách job ({jobs.length})</h2>
        {loading ? (
          <p className="text-sm text-slate-500">Đang tải...</p>
        ) : (
          <ul className="space-y-2 max-h-[70vh] overflow-auto pr-1">
            {jobs.map((item) => (
              <li key={item.id} className="rounded border p-3">
                <p className="font-medium text-sm">{item.title}</p>
                <p className="text-xs text-slate-500">{item.company?.companyName || "(không tên công ty)"}</p>
                <div className="mt-2 flex gap-2">
                  <button type="button" onClick={() => startEdit(item)} className="text-xs px-2 py-1 rounded border">Sửa</button>
                  <button type="button" onClick={() => removeJob(item.id)} className="text-xs px-2 py-1 rounded border border-red-300 text-red-600">Xóa</button>
                </div>
              </li>
            ))}
          </ul>
        )}
      </section>
    </div>
  );
}

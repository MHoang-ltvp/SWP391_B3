import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";
import { useAuth } from "@/context/AuthContext.jsx";

export default function Login() {
  const navigate = useNavigate();
  const { signIn, isAuthenticated } = useAuth();
  const [email, setEmail] = useState("demo@hirego.local");
  const [password, setPassword] = useState("demo");
  const [submitting, setSubmitting] = useState(false);

  if (isAuthenticated) {
    return (
      <div className="max-w-md mx-auto rounded-xl border bg-white p-6 text-center">
        <p className="text-slate-600">Bạn đã đăng nhập.</p>
        <button
          type="button"
          className="mt-4 text-indigo-600 text-sm"
          onClick={() => navigate("/jobs")}
        >
          Đi tới việc làm
        </button>
      </div>
    );
  }

  async function onSubmit(e) {
    e.preventDefault();
    setSubmitting(true);
    try {
      await signIn({ email, password });
      toast.success("Đăng nhập thành công (prototype)");
      navigate("/jobs");
    } catch (err) {
      toast.error(err.message || "Đăng nhập thất bại");
    } finally {
      setSubmitting(false);
    }
  }

  return (
    <div className="max-w-md mx-auto rounded-xl border border-slate-200 bg-white p-8 shadow-sm">
      <h1 className="text-xl font-bold text-slate-900">Đăng nhập demo</h1>
      <p className="text-sm text-slate-500 mt-1">
        BE chấp nhận bất kỳ email/mật khẩu nào và trả về token giả lập.
      </p>
      <form onSubmit={onSubmit} className="mt-6 space-y-4">
        <div>
          <label className="block text-sm font-medium text-slate-700">Email</label>
          <input
            type="email"
            required
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="mt-1 w-full rounded-lg border border-slate-300 px-3 py-2 text-sm"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-slate-700">Mật khẩu</label>
          <input
            type="password"
            required
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="mt-1 w-full rounded-lg border border-slate-300 px-3 py-2 text-sm"
          />
        </div>
        <button
          type="submit"
          disabled={submitting}
          className="w-full rounded-lg bg-indigo-600 py-2.5 text-sm font-medium text-white hover:bg-indigo-700 disabled:opacity-60"
        >
          {submitting ? "Đang xử lý…" : "Đăng nhập"}
        </button>
      </form>
    </div>
  );
}

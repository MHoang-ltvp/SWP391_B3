import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { signInWithPopup } from "firebase/auth";
import { toast } from "sonner";
import { authService } from "@/services/authService";
import { useAuth } from "@/hooks/useAuth";
import { auth, googleProvider, isGoogleAuthConfigured } from "@/utils/firebase";

export default function LoginPage() {
  const navigate = useNavigate();
  const { isAuthenticated, saveSession } = useAuth();

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
          onClick={() => navigate("/dashboard/jobs")}
        >
          Đi tới CRUD Job
        </button>
      </div>
    );
  }

  async function handleSignIn(e) {
    e.preventDefault();
    setSubmitting(true);
    try {
      const account = await authService.signIn({ email, password });
      saveSession({ accessToken: account.accessToken, userEmail: account.email });
      toast.success("Đăng nhập thành công");
      navigate("/dashboard/jobs");
    } catch (err) {
      toast.error(err.message || "Đăng nhập thất bại");
    } finally {
      setSubmitting(false);
    }
  }

  async function handleGoogleSignIn() {
    setSubmitting(true);
    try {
      let payload;

      if (isGoogleAuthConfigured && auth && googleProvider) {
        const result = await signInWithPopup(auth, googleProvider);
        const token = await result.user.getIdToken();
        payload = {
          token,
          email: result.user.email,
          fullName: result.user.displayName,
        };
      } else {
        payload = {
          token: `google-demo-${Date.now()}`,
          email: `google_demo_${Date.now()}@hirego.local`,
          fullName: "Google Demo User",
        };
      }

      const account = await authService.signInWithGoogle(payload);
      saveSession({ accessToken: account.accessToken, userEmail: account.email });
      toast.success("Đăng nhập Google thành công");
      navigate("/dashboard/jobs");
    } catch (err) {
      toast.error(err.message || "Google sign-in thất bại");
    } finally {
      setSubmitting(false);
    }
  }

  return (
    <div className="max-w-md mx-auto rounded-xl border border-slate-200 bg-white p-8 shadow-sm space-y-6">
      <div>
        <h1 className="text-xl font-bold text-slate-900">Đăng nhập</h1>
        <p className="text-sm text-slate-500 mt-1">
          Hỗ trợ đăng nhập thường và Google. Nếu chưa cấu hình Firebase env, sẽ dùng Google demo mode.
        </p>
      </div>

      <form onSubmit={handleSignIn} className="space-y-4">
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

      <button
        type="button"
        onClick={handleGoogleSignIn}
        disabled={submitting}
        className="w-full rounded-lg border border-slate-300 py-2.5 text-sm font-medium text-slate-700 hover:bg-slate-50 disabled:opacity-60"
      >
        {isGoogleAuthConfigured ? "Đăng nhập bằng Google" : "Đăng nhập Google (Demo Mode)"}
      </button>
    </div>
  );
}

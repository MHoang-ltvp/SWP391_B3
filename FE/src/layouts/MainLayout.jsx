import { Link, Outlet } from "react-router-dom";
import { useAuth } from "@/hooks/useAuth";

export default function MainLayout() {
  const { isAuthenticated, email, clearSession } = useAuth();

  return (
    <div className="min-h-screen flex flex-col">
      <header className="border-b border-slate-200 bg-white">
        <div className="mx-auto max-w-6xl px-4 py-3 flex items-center justify-between gap-4">
          <Link to="/" className="text-lg font-semibold text-indigo-600">
            HireGo
          </Link>
          <nav className="flex items-center gap-4 text-sm flex-wrap justify-end">
            <Link to="/jobs" className="text-slate-600 hover:text-indigo-600">
              Việc làm
            </Link>
            <Link to="/dashboard/jobs" className="text-slate-600 hover:text-indigo-600">
              CRUD Job
            </Link>
            {!isAuthenticated ? (
              <Link
                to="/login"
                className="rounded-md bg-indigo-600 px-3 py-1.5 text-white hover:bg-indigo-700"
              >
                Đăng nhập
              </Link>
            ) : (
              <div className="flex items-center gap-3">
                <span className="text-slate-500 truncate max-w-[160px]" title={email}>
                  {email}
                </span>
                <button
                  type="button"
                  onClick={clearSession}
                  className="text-slate-600 hover:text-red-600"
                >
                  Thoát
                </button>
              </div>
            )}
          </nav>
        </div>
      </header>
      <main className="flex-1 mx-auto w-full max-w-6xl px-4 py-8">
        <Outlet />
      </main>
      <footer className="border-t border-slate-200 bg-white py-4 text-center text-xs text-slate-500">
        Prototype sprint 0+ — tách module rõ ràng để team maintain dễ hơn.
      </footer>
    </div>
  );
}

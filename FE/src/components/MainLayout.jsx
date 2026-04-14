import { Link, Outlet } from "react-router-dom";
import { useAuth } from "@/context/AuthContext.jsx";

export function MainLayout() {
  const { isAuthenticated, email, signOut } = useAuth();

  return (
    <div className="min-h-screen flex flex-col">
      <header className="border-b border-slate-200 bg-white">
        <div className="mx-auto max-w-5xl px-4 py-3 flex items-center justify-between gap-4">
          <Link to="/" className="text-lg font-semibold text-indigo-600">
            HireGo
          </Link>
          <nav className="flex items-center gap-4 text-sm">
            <Link to="/jobs" className="text-slate-600 hover:text-indigo-600">
              Việc làm
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
                <span className="text-slate-500 truncate max-w-[140px]" title={email}>
                  {email}
                </span>
                <button
                  type="button"
                  onClick={signOut}
                  className="text-slate-600 hover:text-red-600"
                >
                  Thoát
                </button>
              </div>
            )}
          </nav>
        </div>
      </header>
      <main className="flex-1 mx-auto w-full max-w-5xl px-4 py-8">
        <Outlet />
      </main>
      <footer className="border-t border-slate-200 bg-white py-4 text-center text-xs text-slate-500">
        Prototype sprint 0 — một số chức năng sẽ được nhóm bổ sung trong các sprint tiếp theo.
      </footer>
    </div>
  );
}

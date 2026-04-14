import { useContext } from "react";
import { AuthContext } from "@/store/auth.context.jsx";

export function useAuth() {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error("useAuth phải dùng trong AuthProvider");
  return ctx;
}

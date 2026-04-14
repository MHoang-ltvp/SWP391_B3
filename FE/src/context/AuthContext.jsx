import { createContext, useCallback, useContext, useMemo, useState } from "react";
import api from "@/lib/api";

const AuthContext = createContext(null);

const TOKEN_KEY = "hirego_access_token";
const USER_KEY = "hirego_user_email";

function readLs(key) {
  try {
    return localStorage.getItem(key) || "";
  } catch {
    return "";
  }
}

export function AuthProvider({ children }) {
  const [token, setToken] = useState(() => readLs(TOKEN_KEY));
  const [email, setEmail] = useState(() => readLs(USER_KEY));

  const signIn = useCallback(async ({ email: em, password }) => {
    const res = await api.post("/auth/sign-in", { email: em, password });
    const data = res.data?.data;
    if (!data?.accessToken) throw new Error("Phản hồi đăng nhập không hợp lệ");
    localStorage.setItem(TOKEN_KEY, data.accessToken);
    localStorage.setItem(USER_KEY, data.email || em);
    setToken(data.accessToken);
    setEmail(data.email || em);
    return data;
  }, []);

  const signOut = useCallback(() => {
    localStorage.removeItem(TOKEN_KEY);
    localStorage.removeItem(USER_KEY);
    setToken("");
    setEmail("");
  }, []);

  const value = useMemo(
    () => ({
      isAuthenticated: Boolean(token),
      email,
      signIn,
      signOut,
    }),
    [email, token, signIn, signOut],
  );

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth() {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error("useAuth trong AuthProvider");
  return ctx;
}

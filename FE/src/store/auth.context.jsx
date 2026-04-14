import { createContext, useMemo, useState } from "react";

export const AuthContext = createContext(null);

const TOKEN_KEY = "hirego_access_token";
const USER_KEY = "hirego_user_email";

function readStorage(key) {
  try {
    return localStorage.getItem(key) || "";
  } catch {
    return "";
  }
}

export function AuthProvider({ children }) {
  const [token, setToken] = useState(() => readStorage(TOKEN_KEY));
  const [email, setEmail] = useState(() => readStorage(USER_KEY));

  const value = useMemo(
    () => ({
      token,
      email,
      isAuthenticated: Boolean(token),
      saveSession: ({ accessToken, userEmail }) => {
        localStorage.setItem(TOKEN_KEY, accessToken);
        localStorage.setItem(USER_KEY, userEmail || "");
        setToken(accessToken);
        setEmail(userEmail || "");
      },
      clearSession: () => {
        localStorage.removeItem(TOKEN_KEY);
        localStorage.removeItem(USER_KEY);
        setToken("");
        setEmail("");
      },
    }),
    [token, email],
  );

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

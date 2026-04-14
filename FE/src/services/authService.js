import apiClient from "./apiClient";

export const authService = {
  async signIn(payload) {
    const res = await apiClient.post("/auth/sign-in", payload);
    return res.data.data;
  },

  async signInWithGoogle(payload) {
    const res = await apiClient.post("/auth/google", payload);
    return res.data.data;
  },

  async profile() {
    const res = await apiClient.get("/auth/profile");
    return res.data.data;
  },
};

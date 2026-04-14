import axios from "axios";

const baseURL = import.meta.env.VITE_API_URL || "http://localhost:3000";

const api = axios.create({
  baseURL,
  headers: { "Content-Type": "application/json" },
});

function getStoredToken() {
  try {
    return localStorage.getItem("hirego_access_token") || "";
  } catch {
    return "";
  }
}

api.interceptors.request.use((config) => {
  const token = getStoredToken();
  if (token) config.headers.Authorization = `Bearer ${token}`;
  return config;
});

api.interceptors.response.use(
  (res) => res,
  (error) => {
    if (error.response) {
      const { data } = error.response;
      const msg = data?.errors?.[0] || data?.message || "Có lỗi xảy ra";
      return Promise.reject(new Error(msg));
    }
    return Promise.reject(error);
  },
);

export default api;

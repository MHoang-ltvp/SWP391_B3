import axios from "axios";

const baseURL = import.meta.env.VITE_API_URL || "http://localhost:3000";

const apiClient = axios.create({
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

apiClient.interceptors.request.use((config) => {
  const token = getStoredToken();
  if (token) config.headers.Authorization = `Bearer ${token}`;
  return config;
});

apiClient.interceptors.response.use(
  (res) => res,
  (error) => {
    if (error.response) {
      const msg =
        error.response?.data?.errors?.[0] ||
        error.response?.data?.message ||
        "Có lỗi xảy ra";
      return Promise.reject(new Error(msg));
    }
    return Promise.reject(error);
  },
);

export default apiClient;

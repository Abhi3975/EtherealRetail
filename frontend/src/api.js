import axios from "axios";

const isProduction =
  import.meta.env?.PROD || process.env.NODE_ENV === "production";

const api = axios.create({
  baseURL: isProduction ? "/api" : "http://localhost:5000/api",
});

api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("ethereal_token");

    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }

    let sessionId = localStorage.getItem("ethereal_session");
    if (!sessionId) {
      sessionId = `anon_${Date.now()}`;
      localStorage.setItem("ethereal_session", sessionId);
    }
    config.headers["x-session-id"] = sessionId;

    return config;
  },
  (error) => {
    return Promise.reject(error);
  },
);

export default api;

import axios from "axios";
import toast from "react-hot-toast";

const api = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL || "http://localhost:5000/api",
});

api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("token");

    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }

    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

api.interceptors.response.use(
  (response) => {
    return response;
  },
  (error) => {
    if (error.response) {
      const status = error.response.status;
      const message = error.response.data?.message || "An unexpected error occurred.";
      const isGetProfile = 
        error.config?.url?.includes("/candidate/profile") && 
        error.config?.method?.toLowerCase() === "get";

      // Avoid noisy console errors for the expected "profile not found" state
      if (!(status === 404 && isGetProfile)) {
        console.error(`API Error [Status: ${status}]:`, message);
      }

      switch (status) {
        case 401:
          toast.error("Unauthorized: Please log in again.");
          // Clear token and redirect if needed
          if (typeof window !== "undefined") {
            localStorage.removeItem("token");
            // Optionally redirect to login
            if (!window.location.pathname.includes("/login")) {
              window.location.href = "/login";
            }
          }
          break;
        case 403:
          toast.error("Forbidden: You do not have permission to perform this action.");
          break;
        case 404:
          // Skip toast error for GET /candidate/profile, which is handled gracefully by useCandidate hook
          if (!isGetProfile) {
            toast.error(message || "Resource not found.");
          }
          break;
        case 500:
          toast.error("Internal Server Error: Please try again later.");
          break;
        default:
          toast.error(message);
          break;
      }
    } else if (error.request) {
      toast.error("Network error: Cannot reach the server.");
    } else {
      toast.error("Request failed. Please try again.");
    }

    return Promise.reject(error);
  }
);

export default api;
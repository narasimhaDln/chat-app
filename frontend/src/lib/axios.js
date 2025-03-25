import axios from "axios";
import toast from "react-hot-toast";

const axiosInstance = axios.create({
  baseURL: import.meta.env.MODE === "development" ? "http://localhost:5006/api" : "/api",
  withCredentials: true,
  timeout: 15000, // 15 second timeout
});

// Add response interceptor to handle network errors
axiosInstance.interceptors.response.use(
  (response) => response,
  (error) => {
    if (!error.response) {
      // Network error (server not available, CORS issues, etc.)
      console.error('Network Error:', error.message);
      toast.error('Cannot connect to server. Please try again later.');
    }
    return Promise.reject(error);
  }
);

export { axiosInstance };

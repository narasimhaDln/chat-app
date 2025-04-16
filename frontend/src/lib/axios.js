import axios from "axios";
import toast from "react-hot-toast";
import { API_URL } from "./config.js";

// Use direct connection to production backend
const axiosInstance = axios.create({
  baseURL: API_URL,
  withCredentials: true,
  timeout: 30000, // 30 second timeout
});

// Add response interceptor to handle network errors
axiosInstance.interceptors.response.use(
  (response) => response,
  (error) => {
    if (!error.response) {
      // Network error (server not available, CORS issues, etc.)
      console.error("Network Error:", error.message);
      toast.error("Cannot connect to server. Please try again later.");
    }
    return Promise.reject(error);
  }
);

export { axiosInstance };

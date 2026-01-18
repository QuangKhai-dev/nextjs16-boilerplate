import axios, {
  AxiosError,
  AxiosInstance,
  AxiosResponse,
  HttpStatusCode,
  InternalAxiosRequestConfig,
} from "axios";

// Extend AxiosRequestConfig to include custom metadata if needed
declare module "axios" {
  export interface AxiosRequestConfig {
    metadata?: {
      startTime?: number;
    };
  }
}

// Default timeout: 60 seconds
const DEFAULT_TIMEOUT = 60000;

// Create axios instance with default configuration
const api: AxiosInstance = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL || "",
  timeout: Number(process.env.NEXT_PUBLIC_API_TIMEOUT) || DEFAULT_TIMEOUT,
  headers: {
    "Content-Type": "application/json",
  },
  withCredentials: false,
});

// Request interceptor
api.interceptors.request.use(
  (config: InternalAxiosRequestConfig) => {
    // Add metadata for performance tracking
    if (process.env.NODE_ENV === "development") {
      config.metadata = {
        startTime: performance.now(),
      };
    }

    // Get token from localStorage or cookies (if needed)
    // Example: const token = localStorage.getItem("token");
    // if (token) {
    //   config.headers.Authorization = `Bearer ${token}`;
    // }

    // Handle FormData - don't set Content-Type header (browser will set it with boundary)
    if (config.data instanceof FormData) {
      delete config.headers["Content-Type"];
    }

    return config;
  },
  (error: AxiosError) => {
    return Promise.reject(error);
  }
);

// Response interceptor
api.interceptors.response.use(
  (response: AxiosResponse) => {
    // Log request timing in development
    if (
      process.env.NODE_ENV === "development" &&
      response.config.metadata?.startTime
    ) {
      const duration = performance.now() - response.config.metadata.startTime;
      console.log(
        `[API] ${response.config.method?.toUpperCase()} ${response.config.url} - ${response.status} (${duration.toFixed(2)}ms)`
      );
    }

    // Return only data, or the full response based on your API structure
    return response.data ?? response;
  },
  (error: AxiosError) => {
    // Handle request timing in error case
    if (
      process.env.NODE_ENV === "development" &&
      error.config?.metadata?.startTime
    ) {
      const duration = performance.now() - error.config.metadata.startTime;
      console.error(
        `[API Error] ${error.config.method?.toUpperCase()} ${error.config.url} - ${duration.toFixed(2)}ms`
      );
    }

    // Handle different error status codes
    const status = error?.response?.status;

    switch (status) {
      case HttpStatusCode.Unauthorized:
        // Handle unauthorized - redirect to login or refresh token
        // Example: window.location.href = "/login";
        console.error("[API] Unauthorized - Please login again");
        break;

      case HttpStatusCode.Forbidden:
        console.error("[API] Forbidden - You don't have permission");
        break;

      case HttpStatusCode.NotFound:
        console.error("[API] Resource not found");
        break;

      case HttpStatusCode.InternalServerError:
        console.error("[API] Internal server error");
        break;

      case HttpStatusCode.BadGateway:
        console.error("[API] Bad gateway");
        break;

      case HttpStatusCode.ServiceUnavailable:
        console.error("[API] Service unavailable");
        break;

      default:
        if (status && status >= 400) {
          console.error(`[API] Request failed with status ${status}`);
        }
    }

    // Handle network errors
    if (!error.response) {
      console.error("[API] Network error - Please check your connection");
      return Promise.reject({
        message: error.message || "Network error",
        isNetworkError: true,
      });
    }

    // Return error response data or error message
    const errorData = error.response.data;
    return Promise.reject(errorData ?? error.message);
  }
);

export default api;

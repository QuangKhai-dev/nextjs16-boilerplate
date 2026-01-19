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
    // Return only data, or the full response based on your API structure
    return response.data ?? response;
  },
  (error: AxiosError) => {
    // Handle different error status codes
    const status = error?.response?.status;

    switch (status) {
      case HttpStatusCode.Unauthorized:
        // Handle unauthorized - redirect to login or refresh token
        // Example: window.location.href = "/login";
        break;

      case HttpStatusCode.Forbidden:
        break;

      case HttpStatusCode.NotFound:
        break;

      case HttpStatusCode.InternalServerError:
        break;

      case HttpStatusCode.BadGateway:
        break;

      case HttpStatusCode.ServiceUnavailable:
        break;
    }

    // Handle network errors
    if (!error.response) {
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

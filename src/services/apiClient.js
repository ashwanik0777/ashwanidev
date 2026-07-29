import axios from "axios";
import { apiBaseUrl } from "../config/apiConfig";
import { attachAuthInterceptors } from "./sessionManager";

const apiClient = axios.create({
  baseURL: apiBaseUrl,
  timeout: 10000,
  headers: {
    "Content-Type": "application/json",
  },
});

// Refreshes the access token before it expires and retries once on a 401,
// instead of failing the save with "Invalid or expired token".
attachAuthInterceptors(apiClient);

export default apiClient;

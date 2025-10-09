// src/services/api.js
import axios from "axios";

export const api = axios.create({
  baseURL: "https://capyngen-backendv2-1.onrender.com", // ✅ base without /api/blogs
  // baseURL: "http://localhost:4000",

  headers: { "Content-Type": "application/json" },
});

export function getErrorMessage(err) {
  if (err?.response?.data?.message) return err.response.data.message;
  if (err?.response?.data?.errors?.length)
    return err.response.data.errors[0].msg;
  return err?.message || "Something went wrong";
}

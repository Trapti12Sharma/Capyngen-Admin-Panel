import axios from "axios";

export const api = axios.create({
  baseURL: "https://capyngen-backendv2-1.onrender.com",
  headers: { "Content-Type": "application/json" },
});

// Helper to parse API errors into readable text
export function getErrorMessage(err) {
  if (err?.response?.data?.message) return err.response.data.message;
  if (err?.response?.data?.errors?.length)
    return err.response.data.errors[0].msg;
  return err?.message || "Something went wrong";
}

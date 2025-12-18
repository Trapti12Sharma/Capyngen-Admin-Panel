import axios from "axios";

export const api = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL,
  headers: {
    Accept: "application/json",
  },
});

// ✅ ADD THIS FUNCTION
export function getErrorMessage(error) {
  if (!error) return "Something went wrong";

  // Axios error with response
  if (error.response?.data?.message) {
    return error.response.data.message;
  }

  // Validation errors (array)
  if (error.response?.data?.errors?.length) {
    return error.response.data.errors[0].msg;
  }

  // Network / generic error
  if (error.message) {
    return error.message;
  }

  return "Unexpected error occurred";
}

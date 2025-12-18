import { api } from "./api";

export async function uploadImageToS3(file) {
  const formData = new FormData();
  formData.append("image", file);

  const res = await api.post("/api/upload", formData, {
    headers: { "Content-Type": "multipart/form-data" },
  });

  return res.data.url; // ✅ S3 URL
}

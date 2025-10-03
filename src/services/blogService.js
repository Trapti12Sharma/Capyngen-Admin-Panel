import { api } from "../services/api";

export const BlogService = {
  async list() {
    const res = await api.get("/api/blogs");
    return res.data.blogs || [];
  },
  async create(payload) {
    const res = await api.post("/api/blogs", payload);
    return res.data.blog;
  },
  async update(id, payload) {
    // Requires backend PUT /api/blogs/:id
    const res = await api.put(`/${id}`, payload);
    return res.data.blog;
  },
  async remove(id) {
    // Requires backend DELETE /api/blogs/:id
    const res = await api.delete(`/${id}`);
    return res.data;
  },
};

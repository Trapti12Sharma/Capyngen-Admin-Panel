// src/services/blogService.js
import { api } from "./api";

export const BlogService = {
  // GET all blogs
  async list() {
    const res = await api.get("/api/blogs");
    return res.data.blogs || [];
  },

  // POST new blog
  async create(payload) {
    const res = await api.post("/api/blogs", payload);
    return res.data.blog;
  },

  // PUT update blog by ID
  async update(id, payload) {
    const res = await api.put(`/api/blogs/${id}`, payload); // ✅ FIXED
    return res.data.blog;
  },

  // DELETE blog by ID
  async remove(id) {
    const res = await api.delete(`/api/blogs/${id}`); // ✅ FIXED
    return res.data;
  },
};

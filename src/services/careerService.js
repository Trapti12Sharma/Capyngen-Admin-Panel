import { api } from "./api";

export const CareerService = {
  async list() {
    console.log("🎯 Hitting Career API: /api/careers");
    const res = await api.get("/api/careers");
    console.log("✅ Response:", res.data);
    return res.data.careers || [];
  },
  async create(payload) {
    const res = await api.post("/api/careers", payload);
    return res.data.career;
  },
  async update(id, payload) {
    const res = await api.put(`/api/careers/${id}`, payload);
    return res.data.career;
  },
  async remove(id) {
    const res = await api.delete(`/api/careers/${id}`);
    return res.data;
  },
};

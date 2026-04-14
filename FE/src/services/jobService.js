import apiClient from "./apiClient";

export const jobService = {
  async list({ page = 1, limit = 10, keyword } = {}) {
    const res = await apiClient.get("/job", { params: { page, limit, keyword } });
    return res.data.data;
  },

  async detail(id) {
    const res = await apiClient.get(`/job/${id}`);
    return res.data.data;
  },

  async create(payload) {
    const res = await apiClient.post("/job", payload);
    return res.data.data;
  },

  async update(id, payload) {
    const res = await apiClient.put(`/job/${id}`, payload);
    return res.data.data;
  },

  async remove(id) {
    const res = await apiClient.delete(`/job/${id}`);
    return res.data.data;
  },
};

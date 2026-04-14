import api from "@/lib/api";

export const jobService = {
  async search({ page = 1, limit = 10, keyword } = {}) {
    const res = await api.get("/job", { params: { page, limit, keyword } });
    return res.data.data;
  },

  async getById(id) {
    const res = await api.get(`/job/${id}`);
    return res.data.data;
  },
};

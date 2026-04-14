const jobModel = require("../models/job.model");

function paginate(items, page, limit) {
  const p = Math.max(1, Number(page) || 1);
  const l = Math.min(50, Math.max(1, Number(limit) || 10));
  const start = (p - 1) * l;
  const slice = items.slice(start, start + l);
  const total = items.length;

  return {
    items: slice,
    total,
    page: p,
    limit: l,
    totalPages: Math.ceil(total / l) || 1,
  };
}

function listJobs(query) {
  const { page, limit, keyword } = query;
  let items = jobModel.getAllJobs();

  if (keyword && String(keyword).trim()) {
    const k = String(keyword).toLowerCase();
    items = items.filter(
      (j) =>
        j.title.toLowerCase().includes(k) ||
        (j.company && j.company.companyName.toLowerCase().includes(k)),
    );
  }

  return paginate(items, page, limit);
}

function getJobById(id) {
  const item = jobModel.findJobById(id);
  if (!item) {
    const err = new Error("Không tìm thấy tin tuyển dụng");
    err.statusCode = 404;
    throw err;
  }
  return item;
}

function createJob(payload) {
  if (!payload?.title) {
    const err = new Error("Thiếu trường title");
    err.statusCode = 400;
    throw err;
  }
  return jobModel.addJob(payload);
}

function updateJob(id, payload) {
  const updated = jobModel.updateJob(id, payload || {});
  if (!updated) {
    const err = new Error("Không tìm thấy tin tuyển dụng");
    err.statusCode = 404;
    throw err;
  }
  return updated;
}

function removeJob(id) {
  const deleted = jobModel.deleteJob(id);
  if (!deleted) {
    const err = new Error("Không tìm thấy tin tuyển dụng");
    err.statusCode = 404;
    throw err;
  }
  return deleted;
}

module.exports = {
  listJobs,
  getJobById,
  createJob,
  updateJob,
  removeJob,
};

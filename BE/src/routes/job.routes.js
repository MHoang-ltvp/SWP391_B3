const express = require("express");
const { ok } = require("../util/response");
const { mockJobs } = require("../data/mockJobs");

const router = express.Router();

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

router.get("/", (req, res) => {
  const { page, limit, keyword } = req.query;
  let list = mockJobs;
  if (keyword && String(keyword).trim()) {
    const k = String(keyword).toLowerCase();
    list = mockJobs.filter(
      (j) =>
        j.title.toLowerCase().includes(k) ||
        (j.company && j.company.companyName.toLowerCase().includes(k)),
    );
  }
  return res.json(ok(paginate(list, page, limit)));
});

router.get("/:id", (req, res) => {
  const job = mockJobs.find((j) => j.id === req.params.id);
  if (!job) {
    return res.status(404).json({
      code: 404,
      timestamp: new Date().toISOString(),
      data: null,
      message: "Không tìm thấy tin tuyển dụng",
    });
  }
  return res.json(ok(job));
});

module.exports = router;

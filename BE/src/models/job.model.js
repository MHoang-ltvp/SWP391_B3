const { nowIso } = require("../utils/response");

const mockJobs = [
  {
    id: "job-1",
    title: "Lập trình viên Frontend (React)",
    subTitle: "Làm việc hybrid tại Hà Nội",
    tags: [
      {
        id: "t1",
        name: "React",
        textColor: "#0f172a",
        backgroundColor: "#e0f2fe",
      },
    ],
    address: {
      district: "Cầu Giấy",
      ward: "Dịch Vọng",
      city: "Hà Nội",
    },
    company: {
      id: "co-1",
      companyName: "Công ty Demo Alpha",
      logoURL: "",
      serviceType: "TECH",
    },
    salaryMin: 15000000,
    salaryMax: 25000000,
    jobTimeSlot: { type: "FULL_TIME" },
    jobDetail: {
      content: "<p>Mô tả công việc (prototype).</p>",
      responsibilities: "<p>Phát triển giao diện, phối hợp với BE.</p>",
      requirements: "<p>Có kinh nghiệm React.</p>",
      niceToHave: "<p>Biết Tailwind.</p>",
      skillKeywords: ["React", "JavaScript"],
      benefits: [{ title: "BHXH", content: "Theo luật" }],
    },
    maxApply: 50,
    status: "ACTIVE",
    appliedCount: 3,
    createdAt: "2026-04-01T00:00:00.000Z",
    updatedAt: "2026-04-01T00:00:00.000Z",
  },
  {
    id: "job-2",
    title: "Backend Node.js (Express)",
    subTitle: "Remote",
    tags: [
      {
        id: "t2",
        name: "Node",
        textColor: "#14532d",
        backgroundColor: "#dcfce7",
      },
    ],
    address: {
      district: "Quận 1",
      ward: "Bến Nghé",
      city: "TP.HCM",
    },
    company: {
      id: "co-2",
      companyName: "Công ty Demo Beta",
    },
    salaryMin: 18000000,
    salaryMax: 30000000,
    jobTimeSlot: { type: "FULL_TIME" },
    jobDetail: {
      content: "<p>Xây dựng API REST (prototype).</p>",
    },
    maxApply: 30,
    status: "ACTIVE",
    appliedCount: 0,
    createdAt: "2026-04-05T00:00:00.000Z",
    updatedAt: "2026-04-05T00:00:00.000Z",
  },
];

const jobs = [...mockJobs];

function getAllJobs() {
  return jobs;
}

function findJobById(id) {
  return jobs.find((job) => job.id === id);
}

function addJob(payload) {
  const item = {
    id: `job-${Date.now()}`,
    title: payload.title,
    subTitle: payload.subTitle || "",
    company: {
      id: payload.companyId || `co-${Date.now()}`,
      companyName: payload.companyName || "Công ty chưa đặt tên",
    },
    address: {
      city: payload.city || "",
      district: payload.district || "",
      ward: payload.ward || "",
    },
    salaryMin: Number(payload.salaryMin) || 0,
    salaryMax: Number(payload.salaryMax) || 0,
    status: payload.status || "ACTIVE",
    appliedCount: 0,
    jobTimeSlot: { type: payload.timeSlotType || "FULL_TIME" },
    jobDetail: {
      content: payload.content || "",
      requirements: payload.requirements || "",
      responsibilities: payload.responsibilities || "",
    },
    createdAt: nowIso(),
    updatedAt: nowIso(),
  };
  jobs.unshift(item);
  return item;
}

function updateJob(id, payload) {
  const job = findJobById(id);
  if (!job) return null;

  if (payload.title !== undefined) job.title = payload.title;
  if (payload.subTitle !== undefined) job.subTitle = payload.subTitle;
  if (payload.companyName !== undefined) {
    job.company = { ...(job.company || {}), companyName: payload.companyName };
  }
  if (payload.city !== undefined || payload.district !== undefined || payload.ward !== undefined) {
    job.address = {
      ...(job.address || {}),
      city: payload.city ?? job.address?.city ?? "",
      district: payload.district ?? job.address?.district ?? "",
      ward: payload.ward ?? job.address?.ward ?? "",
    };
  }
  if (payload.salaryMin !== undefined) job.salaryMin = Number(payload.salaryMin) || 0;
  if (payload.salaryMax !== undefined) job.salaryMax = Number(payload.salaryMax) || 0;
  if (payload.status !== undefined) job.status = payload.status;

  if (
    payload.content !== undefined ||
    payload.requirements !== undefined ||
    payload.responsibilities !== undefined
  ) {
    job.jobDetail = {
      ...(job.jobDetail || {}),
      content: payload.content ?? job.jobDetail?.content ?? "",
      requirements: payload.requirements ?? job.jobDetail?.requirements ?? "",
      responsibilities: payload.responsibilities ?? job.jobDetail?.responsibilities ?? "",
    };
  }

  job.updatedAt = nowIso();
  return job;
}

function deleteJob(id) {
  const idx = jobs.findIndex((job) => job.id === id);
  if (idx < 0) return null;
  const [removed] = jobs.splice(idx, 1);
  return removed;
}

module.exports = {
  getAllJobs,
  findJobById,
  addJob,
  updateJob,
  deleteJob,
};

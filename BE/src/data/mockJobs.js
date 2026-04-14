/** Dữ liệu mẫu cho sprint prototype — thay bằng MongoDB sau */
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
  },
];

module.exports = { mockJobs };

/**
 * HireGo — backend prototype (JavaScript)
 * Sprint 0: API tối giản, không MongoDB, không OpenAI / recommendations / scan CV AI.
 */
require("dotenv").config();

const express = require("express");
const cors = require("cors");
const authRoutes = require("./routes/auth.routes");
const jobRoutes = require("./routes/job.routes");

const app = express();
const PORT = process.env.PORT || 3000;

app.use(cors({ origin: true, credentials: true }));
app.use(express.json());

app.get("/health", (_req, res) => {
  res.json({ ok: true, service: "hirego-be-prototype" });
});

app.use("/auth", authRoutes);
app.use("/job", jobRoutes);

app.use((err, _req, res, _next) => {
  console.error(err);
  res.status(500).json({
    code: 500,
    timestamp: new Date().toISOString(),
    data: null,
    message: err.message || "Lỗi máy chủ",
  });
});

app.listen(PORT, () => {
  console.log(`BE prototype: http://localhost:${PORT}`);
});

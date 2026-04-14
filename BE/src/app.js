const express = require("express");
const cors = require("cors");

const authRoutes = require("./routes/auth.routes");
const jobRoutes = require("./routes/job.routes");
const { notFound } = require("./middlewares/notFound.middleware");
const { errorHandler } = require("./middlewares/error.middleware");

const app = express();

app.use(cors({ origin: true, credentials: true }));
app.use(express.json());

app.get("/health", (_req, res) => {
  res.json({ ok: true, service: "hirego-be-prototype" });
});

app.use("/auth", authRoutes);
app.use("/job", jobRoutes);

app.use(notFound);
app.use(errorHandler);

module.exports = app;

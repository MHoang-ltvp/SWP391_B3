const express = require("express");
const { ok, fail } = require("../util/response");

const router = express.Router();

/** Bộ nhớ đơn giản: token -> user (chỉ dùng prototype) */
const sessions = new Map();

router.post("/sign-in", (req, res) => {
  const { email, password } = req.body || {};
  if (!email || !password) {
    return res.status(400).json(fail("Thiếu email hoặc mật khẩu", 400));
  }

  const accessToken = `prototype.${Buffer.from(email).toString("base64url")}`;
  const account = {
    id: "acc-demo-1",
    email,
    fullName: email.split("@")[0] || "Người dùng demo",
    avatar: "",
    accessToken,
    refreshToken: "refresh-demo",
    roles: ["USER"],
    surveyCompleted: true,
  };
  sessions.set(accessToken, account);

  return res.json(ok(account));
});

router.get("/profile", (req, res) => {
  const auth = req.headers.authorization || "";
  const token = auth.startsWith("Bearer ") ? auth.slice(7) : "";
  const account = sessions.get(token);
  if (!account) {
    return res.status(401).json(fail("Chưa đăng nhập hoặc token không hợp lệ", 401));
  }

  const profile = {
    id: account.id,
    email: account.email,
    fullName: account.fullName,
    avatar: account.avatar,
    portfolioURL: "",
    roles: account.roles,
    introduction: "",
    phoneNumber: "",
    surveyCompleted: account.surveyCompleted,
  };
  return res.json(ok(profile));
});

module.exports = router;

const sessions = new Map();

function buildAccount({ email, fullName }) {
  const accessToken = `prototype.${Buffer.from(email).toString("base64url")}`;
  const account = {
    id: `acc-${Date.now()}`,
    email,
    fullName: fullName || email.split("@")[0] || "Người dùng demo",
    avatar: "",
    accessToken,
    refreshToken: "refresh-demo",
    roles: ["USER"],
    surveyCompleted: true,
    loginProvider: "password",
  };
  sessions.set(accessToken, account);
  return account;
}

function signInByPassword({ email, password }) {
  if (!email || !password) {
    const err = new Error("Thiếu email hoặc mật khẩu");
    err.statusCode = 400;
    throw err;
  }
  return buildAccount({ email });
}

function signInByGoogle({ token, email, fullName }) {
  if (!token) {
    const err = new Error("Thiếu Google token");
    err.statusCode = 400;
    throw err;
  }

  const safeEmail = email || `google_user_${Date.now()}@hirego.local`;
  const account = buildAccount({ email: safeEmail, fullName });
  account.loginProvider = "google";
  return account;
}

function getProfileFromHeader(authHeader) {
  const token = (authHeader || "").startsWith("Bearer ")
    ? authHeader.slice(7)
    : "";

  const account = sessions.get(token);
  if (!account) {
    const err = new Error("Chưa đăng nhập hoặc token không hợp lệ");
    err.statusCode = 401;
    throw err;
  }

  return {
    id: account.id,
    email: account.email,
    fullName: account.fullName,
    avatar: account.avatar,
    portfolioURL: "",
    roles: account.roles,
    introduction: "",
    phoneNumber: "",
    surveyCompleted: account.surveyCompleted,
    loginProvider: account.loginProvider,
  };
}

module.exports = {
  signInByPassword,
  signInByGoogle,
  getProfileFromHeader,
};

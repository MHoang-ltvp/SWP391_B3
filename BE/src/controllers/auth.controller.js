const { ok, fail } = require("../utils/response");
const authService = require("../services/auth.service");

function signIn(req, res) {
  try {
    const account = authService.signInByPassword(req.body || {});
    return res.json(ok(account));
  } catch (error) {
    const code = error.statusCode || 400;
    return res.status(code).json(fail(error.message, code));
  }
}

function signInWithGoogle(req, res) {
  try {
    const account = authService.signInByGoogle(req.body || {});
    return res.json(ok(account));
  } catch (error) {
    const code = error.statusCode || 400;
    return res.status(code).json(fail(error.message, code));
  }
}

function profile(req, res) {
  try {
    const profileData = authService.getProfileFromHeader(req.headers.authorization || "");
    return res.json(ok(profileData));
  } catch (error) {
    const code = error.statusCode || 401;
    return res.status(code).json(fail(error.message, code));
  }
}

module.exports = {
  signIn,
  signInWithGoogle,
  profile,
};

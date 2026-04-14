const { fail } = require("../utils/response");

function errorHandler(err, _req, res, _next) {
  console.error(err);
  const statusCode = err.statusCode || 500;
  return res.status(statusCode).json(fail(err.message || "Lỗi máy chủ", statusCode));
}

module.exports = { errorHandler };

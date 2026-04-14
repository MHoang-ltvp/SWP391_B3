const { fail } = require("../utils/response");

function notFound(_req, res) {
  return res.status(404).json(fail("API không tồn tại", 404));
}

module.exports = { notFound };

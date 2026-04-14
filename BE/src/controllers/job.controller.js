const { ok, fail } = require("../utils/response");
const jobService = require("../services/job.service");

function list(req, res) {
  try {
    const result = jobService.listJobs(req.query || {});
    return res.json(ok(result));
  } catch (error) {
    const code = error.statusCode || 400;
    return res.status(code).json(fail(error.message, code));
  }
}

function detail(req, res) {
  try {
    const result = jobService.getJobById(req.params.id);
    return res.json(ok(result));
  } catch (error) {
    const code = error.statusCode || 404;
    return res.status(code).json(fail(error.message, code));
  }
}

function create(req, res) {
  try {
    const created = jobService.createJob(req.body || {});
    return res.status(201).json(ok(created, 201));
  } catch (error) {
    const code = error.statusCode || 400;
    return res.status(code).json(fail(error.message, code));
  }
}

function update(req, res) {
  try {
    const updated = jobService.updateJob(req.params.id, req.body || {});
    return res.json(ok(updated));
  } catch (error) {
    const code = error.statusCode || 404;
    return res.status(code).json(fail(error.message, code));
  }
}

function remove(req, res) {
  try {
    const deleted = jobService.removeJob(req.params.id);
    return res.json(ok(deleted));
  } catch (error) {
    const code = error.statusCode || 404;
    return res.status(code).json(fail(error.message, code));
  }
}

module.exports = {
  list,
  detail,
  create,
  update,
  remove,
};

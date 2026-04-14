function nowIso() {
  return new Date().toISOString();
}

function ok(data, code = 200) {
  return {
    code,
    timestamp: nowIso(),
    data,
  };
}

function fail(message, code = 400, errors) {
  const body = {
    code,
    timestamp: nowIso(),
    data: null,
    message,
  };
  if (errors && errors.length) body.errors = errors;
  return body;
}

module.exports = { ok, fail, nowIso };

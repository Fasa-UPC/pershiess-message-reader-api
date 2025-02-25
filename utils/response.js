class ResponseBase {
  body;
  hasError;
  status;

  constructor({ body, hasError = false, status }) {
    this.body = body;
    this.hasError = hasError;
    this.status = status;
  }
}

class ResponseStatus {
  static SUCCESS = 0;
}

module.exports = {
  ResponseBase,
  ResponseStatus,
};

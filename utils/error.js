class ResponseError extends Error {
  statusCode;
  constructor(statusCode) {
    super(this.message);
    this.statusCode = statusCode;
  }
}

module.exports = {
  ResponseError,
};

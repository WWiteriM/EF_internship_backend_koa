class Error403 extends Error {
  constructor(code, message = 'Something wrong with 403 error') {
    super();
    this.code = code;
    this.message = message;
  }
}

module.exports = Error403;

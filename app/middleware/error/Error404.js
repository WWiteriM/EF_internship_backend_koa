class Error404 extends Error {
  constructor(code, message = 'Something wrong with 404 error') {
    super();
    this.code = code;
    this.message = message;
  }
}

module.exports = Error404;

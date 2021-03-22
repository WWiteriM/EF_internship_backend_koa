class Error500 extends Error {
  constructor(code, message = 'Something wrong with 500 error') {
    super();
    this.code = code;
    this.message = message;
  }
}

module.exports = Error500;

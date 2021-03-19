class Error400 extends Error {
  constructor(code, message = 'Something wrong with 400 error') {
    super();
    this.code = code;
    this.message = message;
  }
}

module.exports = Error400;

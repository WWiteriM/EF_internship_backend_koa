const Error400 = require('./Error400');
const Error404 = require('./Error404');
const Error500 = require('./Error500');

function errorHandler() {
  // eslint-disable-next-line func-names
  return async function (ctx, next) {
    try {
      await next();
    } catch (err) {
      if (err instanceof Error400) {
        ctx.status = err.code;
        ctx.body = err.message ? err.message : 'Something wrong with 400 error';
      } else if (err instanceof Error404) {
        ctx.status = err.code;
        ctx.body = err.message ? err.message : 'Something wrong with 404 error';
      } else {
        ctx.status = err.code;
        ctx.body = err.message ? err.message : 'Something wrong with 500 error';
      }
    }
  };
}

function errorThrow(code) {
  if (code === 400) {
    throw new Error400(code, 'Validation Error, please enter valid data');
  } else if (code === 404) {
    throw new Error404(code, 'Your data was not found');
  } else {
    throw new Error500(code, 'Bad Request');
  }
}

module.exports = { errorThrow, errorHandler };

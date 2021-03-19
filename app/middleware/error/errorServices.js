const Error400 = require('./Error400');
const Error404 = require('./Error404');
const Error500 = require('./Error500');

function errorHandler() {
  return async (ctx, next) => {
    try {
      await next();
    } catch (err) {
      if (err instanceof Error400) {
        ctx.status = err.code;
        ctx.body = err.message;
      } else if (err instanceof Error404) {
        ctx.status = err.code;
        ctx.body = err.message;
      } else {
        ctx.status = 500;
        ctx.body = 'Bad Request';
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

const Router = require('koa-router');

const router = new Router({
  prefix: '/profile',
});

router
  .get('/:id', getProfile)
  .post('/', postProfile)
  .put('/', putProfile)
  .delete('/', deleteProfile);

function getProfile(ctx) {
  try {
    const { params } = ctx;
    ctx.body = `GET specific profile method with params = ${JSON.stringify(params)}`;
    ctx.status = 200;
  } catch (err) {
    ctx.status = err.status;
    ctx.body = err.message;
  }
}

function postProfile(ctx) {
  try {
    ctx.body = 'POST profile method';
    ctx.status = 200;
  } catch (err) {
    ctx.status = err.status;
    ctx.body = err.message;
  }
}

function putProfile(ctx) {
  try {
    ctx.body = 'PUT profile method';
    ctx.status = 200;
  } catch (err) {
    ctx.status = err.status;
    ctx.body = err.message;
  }
}

function deleteProfile(ctx) {
  try {
    ctx.body = 'DELETE profile method';
    ctx.status = 200;
  } catch (err) {
    ctx.status = err.status;
    ctx.body = err.message;
  }
}

module.exports = router;

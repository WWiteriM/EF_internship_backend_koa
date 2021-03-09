const Router = require('koa-router');

const router = new Router({
  prefix: '/profile',
});

const getProfile = (ctx, next) => {
  const { params } = ctx;
  ctx.body = `GET specific profile method with params = ${JSON.stringify(params)}`;
  next();
};

const postProfile = (ctx, next) => {
  ctx.body = 'POST profile method';
  next();
};

const putProfile = (ctx, next) => {
  ctx.body = 'PUT profile method';
  next();
};

const deleteProfile = (ctx, next) => {
  ctx.body = 'DELETE profile method';
  next();
};

router
  .get('/:id', getProfile)
  .post('/', postProfile)
  .put('/', putProfile)
  .delete('/', deleteProfile);

module.exports = router;

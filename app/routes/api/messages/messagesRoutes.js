const Router = require('koa-router');

const router = new Router({
  prefix: '/messages',
});

const getMessage = (ctx, next) => {
  const { params } = ctx;
  ctx.body = `GET specific messages method with params = ${JSON.stringify(params)}`;
  next();
};

const getAllMessages = (ctx, next) => {
  ctx.body = 'GET all messages method';
  next();
};

const postMessages = (ctx, next) => {
  ctx.body = 'POST messages method';
  next();
};

const putMessages = (ctx, next) => {
  ctx.body = 'PUT messages method';
  next();
};

const deleteMessages = (ctx, next) => {
  ctx.body = 'DELETE messages method';
  next();
};

router
  .get('/:id', getMessage)
  .get('/', getAllMessages)
  .post('/', postMessages)
  .put('/', putMessages)
  .delete('/', deleteMessages);

module.exports = router;

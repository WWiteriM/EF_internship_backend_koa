const Router = require('koa-router');

const router = new Router({
  prefix: '/news',
});

const getNews = (ctx, next) => {
  const { params } = ctx;
  ctx.body = `GET specific news method with params = ${JSON.stringify(params)}`;
  next();
};

const getListOfNews = (ctx, next) => {
  ctx.body = 'GET all news method';
  next();
};

const postNews = (ctx, next) => {
  ctx.body = 'POST news method';
  next();
};

const putNews = (ctx, next) => {
  ctx.body = 'PUT news method';
  next();
};

const deleteNews = (ctx, next) => {
  ctx.body = 'DELETE news method';
  next();
};

router
  .get('/:id', getNews)
  .get('/', getListOfNews)
  .post('/', postNews)
  .put('/', putNews)
  .delete('/', deleteNews);

module.exports = router;

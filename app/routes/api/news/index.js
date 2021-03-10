const Router = require('koa-router');

const router = new Router({
  prefix: '/news',
});

router
  .get('/:id', getNews)
  .get('/', getListOfNews)
  .post('/', postNews)
  .put('/', putNews)
  .delete('/', deleteNews);

function getNews(ctx) {
  try {
    const { params } = ctx;
    ctx.body = `GET specific news method with params = ${JSON.stringify(params)}`;
    ctx.status = 200;
  } catch (err) {
    ctx.status = 500;
    ctx.body = err.message;
  }
}

function getListOfNews(ctx) {
  try {
    ctx.body = 'GET all news method';
    ctx.status = 200;
  } catch (err) {
    ctx.status = 500;
    ctx.body = err.message;
  }
}

function postNews(ctx) {
  try {
    ctx.body = 'POST news method';
    ctx.status = 200;
  } catch (err) {
    ctx.status = 500;
    ctx.body = err.message;
  }
}

function putNews(ctx) {
  try {
    ctx.body = 'PUT news method';
    ctx.status = 200;
  } catch (err) {
    ctx.status = 500;
    ctx.body = err.message;
  }
}

function deleteNews(ctx) {
  try {
    ctx.body = 'DELETE news method';
    ctx.status = 200;
  } catch (err) {
    ctx.status = 500;
    ctx.body = err.message;
  }
}

module.exports = router;

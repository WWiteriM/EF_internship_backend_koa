const Router = require('koa-router');

const router = new Router();

router
  .get('/notes', (ctx, next) => {
    ctx.body = 'GET notes method';
    next();
  })
  .post('/notes', (ctx, next) => {
    ctx.body = 'POST notes method';
    next();
  })
  .put('/notes', (ctx, next) => {
    ctx.body = 'PUT notes method';
    next();
  })
  .delete('/notes', (ctx, next) => {
    ctx.body = 'DELETE notes method';
    next();
  });

module.exports = router;

const Router = require('koa-router');

const router = new Router();

router
  .get('/pets/:id', (ctx, next) => {
    ctx.body = 'GET pets method';
    next();
  })
  .post('/pets', (ctx, next) => {
    ctx.body = 'POST pets method';
    next();
  })
  .put('/pets', (ctx, next) => {
    ctx.body = 'PUT pets method';
    next();
  })
  .delete('/pets', (ctx, next) => {
    ctx.body = 'DELETE pets method';
    next();
  });

module.exports = router;

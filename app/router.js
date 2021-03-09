const Router = require('koa-router');
const apiRouter = require('./routes/apiRoutes');

const router = new Router({
  prefix: '/main',
});

router.use(apiRouter.routes(), apiRouter.allowedMethods());

module.exports = router;

const Router = require('koa-router');

const router = new Router({
    prefix: '/main',
});

const apiRouter = require('./routes/apiRoutes');

router.use(apiRouter.routes(), apiRouter.allowedMethods());

module.exports = router;

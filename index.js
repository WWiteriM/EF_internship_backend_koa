const Koa = require('koa');
const apiRouter = require('./app/routes/apiRoutes');

const app = new Koa();
const { PORT } = process.env;

app.use(apiRouter.routes()).use(apiRouter.allowedMethods());

app.listen(PORT);

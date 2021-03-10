const Koa = require('koa');
const apiRouter = require('./app/routes');

const app = new Koa();
const { PORT } = process.env;

app.use(apiRouter.routes()).use(apiRouter.allowedMethods());

app.listen(PORT);

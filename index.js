const Koa = require('koa');
const json = require('koa-json');
const apiRouter = require('./app/routes');

const app = new Koa();
const { PORT } = process.env;

app.use(json());
app.use(apiRouter.routes()).use(apiRouter.allowedMethods());

app.listen(PORT);

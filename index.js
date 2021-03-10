const Koa = require('koa');
const json = require('koa-json');
const bodyParser = require('koa-bodyparser');
const apiRouter = require('./app/routes');

const app = new Koa();
const { PORT } = process.env;

app.use(apiRouter.routes()).use(apiRouter.allowedMethods());
app.use(json());
app.use(bodyParser());

app.listen(PORT);

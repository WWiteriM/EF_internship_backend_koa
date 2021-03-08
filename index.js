const Koa = require('koa');

const app = new Koa();
const { PORT } = process.env;

const router = require('./app/router');

app.use(router.routes()).use(router.allowedMethods());

app.listen(PORT);

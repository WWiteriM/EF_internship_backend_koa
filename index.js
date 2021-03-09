const Koa = require('koa');
const router = require('./app/router');

const app = new Koa();
const { PORT } = process.env;

app.use(router.routes()).use(router.allowedMethods());

app.listen(PORT);

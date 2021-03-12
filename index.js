const Koa = require('koa');
const json = require('koa-json');
const bodyParser = require('koa-bodyparser');
const logger = require('koa-logger');
const cors = require('@koa/cors');
require('dotenv').config();
const apiRouter = require('./app/routes');

const app = new Koa();
const { PORT } = process.env;

app.use(cors());
app.use(logger());
app.use(json());
app.use(bodyParser());
app.use(apiRouter.routes()).use(apiRouter.allowedMethods());

app.listen(PORT);

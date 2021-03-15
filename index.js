const Koa = require('koa');
require('dotenv').config();
const json = require('koa-json');
const bodyParser = require('koa-bodyparser');
const logger = require('koa-logger');
const cors = require('@koa/cors');
const dbSetup = require('./knex/db-setup');
const apiRouter = require('./app/routes');

const app = new Koa();
const { PORT } = process.env;

dbSetup();
app.use(cors());
app.use(logger());
app.use(json());
app.use(bodyParser());
app.use(apiRouter.routes()).use(apiRouter.allowedMethods());

app.listen(PORT);

const Koa = require('koa');
require('dotenv').config();
const json = require('koa-json');
const bodyParser = require('koa-bodyparser');
const logger = require('koa-logger');
const cors = require('@koa/cors');
const helmet = require('koa-helmet');
const passport = require('koa-passport');
const passportConfig = require('./app/services/auth');
const dbSetup = require('./knex/db-setup');
const { errorHandler } = require('./app/middleware/error/errorServices');
const apiRouter = require('./app/routes');

const app = new Koa();
const { PORT } = process.env;

dbSetup();
passportConfig(passport);
app.use(passport.initialize());
app.use(helmet());
app.use(errorHandler());
app.use(cors());
app.use(logger());
app.use(json());
app.use(bodyParser());
app.use(apiRouter.routes()).use(apiRouter.allowedMethods());

app.listen(PORT);

const Router = require('koa-router');
const friends = require('./api/friends');
const messages = require('./api/messages');
const news = require('./api/news');
const photos = require('./api/photos');
const users = require('./api/users');

const router = new Router({
  prefix: '/api',
});

router.use(friends.routes(), messages.routes(), news.routes(), photos.routes(), users.routes());

module.exports = router;

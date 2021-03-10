const Router = require('koa-router');
const friends = require('./api/friends');
const messages = require('./api/messages');
const news = require('./api/news');
const photos = require('./api/photos');
const profile = require('./api/profile');

const router = new Router({
  prefix: '/api',
});

router.use(friends.routes(), messages.routes(), news.routes(), photos.routes(), profile.routes());

module.exports = router;

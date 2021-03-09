const Router = require('koa-router');
const friends = require('./api/friends/friendsRoutes');
const messages = require('./api/messages/messagesRoutes');
const news = require('./api/news/newsRoutes');
const photos = require('./api/photos/photosRoutes');
const profile = require('./api/profile/profileRoutes');

const router = new Router({
  prefix: '/api',
});

router.use(friends.routes(), messages.routes(), news.routes(), photos.routes(), profile.routes());

module.exports = router;

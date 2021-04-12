const Router = require('koa-router');
const friends = require('./api/friends');
const messages = require('./api/messages');
const news = require('./api/news');
const photos = require('./api/photos');
const users = require('./api/users');
const albums = require('./api/albums');
const auth = require('./api/auth');

const router = new Router({
  prefix: '/api',
});

router.use(
  friends.routes(),
  messages.routes(),
  news.routes(),
  photos.routes(),
  users.routes(),
  albums.routes(),
  auth.routes(),
);

module.exports = router;

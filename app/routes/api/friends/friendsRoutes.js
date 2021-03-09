const Router = require('koa-router');

const router = new Router({
  prefix: '/friends',
});

const getFriend = (ctx, next) => {
  const { params } = ctx;
  ctx.body = `GET specific friends method with params = ${JSON.stringify(params)}`;
  next();
};

const getListOfFriends = (ctx, next) => {
  ctx.body = 'GET all friends method';
  next();
};

const postFriend = (ctx, next) => {
  ctx.body = 'POST friends method';
  next();
};

const putFriend = (ctx, next) => {
  ctx.body = 'PUT friends method';
  next();
};

const deleteFriend = (ctx, next) => {
  ctx.body = 'DELETE friends method';
  next();
};

router
  .get('/:id', getFriend)
  .get('/', getListOfFriends)
  .post('/', postFriend)
  .put('/', putFriend)
  .delete('/', deleteFriend);

module.exports = router;

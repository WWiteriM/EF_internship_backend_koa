const Router = require('koa-router');

const router = new Router({
  prefix: '/friends',
});

router
  .get('/:id', getFriend)
  .get('/', getListOfFriends)
  .post('/', postFriend)
  .put('/', putFriend)
  .delete('/', deleteFriend);

function getFriend(ctx) {
  try {
    const { params } = ctx;
    ctx.body = `GET specific friends method with params = ${JSON.stringify(params)}`;
    ctx.status = 200;
  } catch (err) {
    ctx.status = err.status;
    ctx.body = err.message;
  }
}

function getListOfFriends(ctx) {
  try {
    ctx.body = 'GET all friends method';
    ctx.status = 200;
  } catch (err) {
    ctx.status = err.status;
    ctx.body = err.message;
  }
}

function postFriend(ctx) {
  try {
    ctx.body = 'POST friends method';
    ctx.status = 200;
  } catch (err) {
    ctx.status = err.status;
    ctx.body = err.message;
  }
}

function putFriend(ctx) {
  try {
    ctx.body = 'PUT friends method';
    ctx.status = 200;
  } catch (err) {
    ctx.status = err.status;
    ctx.body = err.message;
  }
}

function deleteFriend(ctx) {
  try {
    ctx.body = 'DELETE friends method';
    ctx.status = 200;
  } catch (err) {
    ctx.status = err.status;
    ctx.body = err.message;
  }
}

module.exports = router;

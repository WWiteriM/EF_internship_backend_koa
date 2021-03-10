const Router = require('koa-router');

const router = new Router({
  prefix: '/messages',
});

router
  .get('/:id', getMessage)
  .get('/', getAllMessages)
  .post('/', postMessages)
  .put('/', putMessages)
  .delete('/', deleteMessages);

function getMessage(ctx) {
  try {
    const { params } = ctx;
    ctx.body = `GET specific messages method with params = ${JSON.stringify(params)}`;
    ctx.status = 200;
  } catch (err) {
    ctx.status = err.status;
    ctx.body = err.message;
  }
}

function getAllMessages(ctx) {
  try {
    ctx.body = 'GET all messages method';
    ctx.status = 200;
  } catch (err) {
    ctx.status = err.status;
    ctx.body = err.message;
  }
}

function postMessages(ctx) {
  try {
    ctx.body = 'POST messages method';
    ctx.status = 200;
  } catch (err) {
    ctx.status = err.status;
    ctx.body = err.message;
  }
}

function putMessages(ctx) {
  try {
    ctx.body = 'PUT messages method';
    ctx.status = 200;
  } catch (err) {
    ctx.status = err.status;
    ctx.body = err.message;
  }
}

function deleteMessages(ctx) {
  try {
    ctx.body = 'DELETE messages method';
    ctx.status = 200;
  } catch (err) {
    ctx.status = err.status;
    ctx.body = err.message;
  }
}

module.exports = router;

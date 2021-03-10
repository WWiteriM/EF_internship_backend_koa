const Router = require('koa-router');

const router = new Router({
  prefix: '/photos',
});

router
  .get('/:id', getPhoto)
  .get('/', getAllPhotos)
  .post('/', postPhotos)
  .put('/', putPhotos)
  .delete('/', deletePhotos);

function getAllPhotos(ctx) {
  try {
    ctx.body = 'GET all photos method';
    ctx.status = 200;
  } catch (err) {
    ctx.status = 500;
    ctx.body = err.message;
  }
}

function getPhoto(ctx) {
  try {
    const { params } = ctx;
    ctx.body = `GET specific photos method with params = ${JSON.stringify(params)}`;
    ctx.status = 200;
  } catch (err) {
    ctx.status = 500;
    ctx.body = err.message;
  }
}

function postPhotos(ctx) {
  try {
    ctx.body = 'POST photos method';
    ctx.status = 200;
  } catch (err) {
    ctx.status = 500;
    ctx.body = err.message;
  }
}

function putPhotos(ctx) {
  try {
    ctx.body = 'PUT photos method';
    ctx.status = 200;
  } catch (err) {
    ctx.status = 500;
    ctx.body = err.message;
  }
}

function deletePhotos(ctx) {
  try {
    ctx.body = 'DELETE photos method';
    ctx.status = 200;
  } catch (err) {
    ctx.status = 500;
    ctx.body = err.message;
  }
}

module.exports = router;

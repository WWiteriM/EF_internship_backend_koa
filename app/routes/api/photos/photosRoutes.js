const Router = require('koa-router');

const router = new Router({
  prefix: '/photos',
});

const getAllPhotos = (ctx, next) => {
  ctx.body = 'GET all photos method';
  next();
};

const getPhoto = (ctx, next) => {
  const { params } = ctx;
  ctx.body = `GET specific photos method with params = ${JSON.stringify(params)}`;
  next();
};

const postPhotos = (ctx, next) => {
  ctx.body = ' POST photos method';
  next();
};

const putPhotos = (ctx, next) => {
  ctx.body = 'PUT photos method';
  next();
};

const deletePhotos = (ctx, next) => {
  ctx.body = 'DELETE photos method';
  next();
};

router
  .get('/:id', getPhoto)
  .get('/', getAllPhotos)
  .post('/', postPhotos)
  .put('/', putPhotos)
  .delete('/', deletePhotos);

module.exports = router;

const Router = require('koa-router');
const { getProfileById, deleteProfileById } = require('../../../entities/users/index');

const router = new Router({
  prefix: '/profile',
});

router
  .get('/:id', getProfile)
  .post('/', postProfile)
  .put('/', putProfile)
  .delete('/:id', deleteProfile);

async function getProfile(ctx) {
  try {
    const query = await getProfileById(ctx.params.id);
    ctx.body = JSON.stringify(query);
    ctx.status = 200;
  } catch (err) {
    ctx.status = 500;
    ctx.body = err.message;
  }
}

function postProfile(ctx) {
  try {
    ctx.body = 'POST profile method';
    ctx.status = 200;
  } catch (err) {
    ctx.status = 500;
    ctx.body = err.message;
  }
}

function putProfile(ctx) {
  try {
    ctx.body = 'PUT profile method';
    ctx.status = 200;
  } catch (err) {
    ctx.status = 500;
    ctx.body = err.message;
  }
}

async function deleteProfile(ctx) {
  try {
    const query = await deleteProfileById(ctx.params.id);
    ctx.body = `Uninstall completed with code ${query}`;
    ctx.status = 200;
  } catch (err) {
    ctx.status = 500;
    ctx.body = err.message;
  }
}

module.exports = router;

const Router = require('koa-router');
const {
  getProfileFunc,
  addProfileFunc,
  updateProfileFunc,
  deleteProfileFunc,
} = require('../../../entities/users/index');

const router = new Router({
  prefix: '/profile',
});

router
  .get('/:id', getProfile)
  .post('/', postProfile)
  .put('/:id', putProfile)
  .delete('/:id', deleteProfile);

async function getProfile(ctx) {
  try {
    const query = await getProfileFunc(ctx.params.id);
    ctx.body = JSON.stringify(query);
    ctx.status = 200;
  } catch (err) {
    ctx.status = 500;
    ctx.body = err.message;
  }
}

async function postProfile(ctx) {
  try {
    const params = ctx.request.body;
    const query = await addProfileFunc(params);
    ctx.body = JSON.stringify(query);
    ctx.status = 200;
  } catch (err) {
    ctx.status = 500;
    ctx.body = err.message;
  }
}

async function putProfile(ctx) {
  try {
    const { id } = ctx.params;
    const params = ctx.request.body;
    const query = await updateProfileFunc(id, params);
    ctx.body = `Update completed with code ${query}`;
    ctx.status = 200;
  } catch (err) {
    ctx.status = 500;
    ctx.body = err.message;
  }
}

async function deleteProfile(ctx) {
  try {
    const query = await deleteProfileFunc(ctx.params.id);
    ctx.body = `Uninstall completed with code ${query}`;
    ctx.status = 200;
  } catch (err) {
    ctx.status = 500;
    ctx.body = err.message;
  }
}

module.exports = router;

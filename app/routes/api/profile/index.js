const Router = require('koa-router');
const User = require('../../../entities/users/index');
const validateDto = require('../../../middleware/validate-dto');
const { addUserSchema, updateUserSchema } = require('../../../middleware/userSchema/index');

const router = new Router({
  prefix: '/profile',
});

router
  .get('/:id', getProfile)
  .post('/', validateDto(addUserSchema), postProfile)
  .put('/:id', validateDto(updateUserSchema), putProfile)
  .delete('/:id', deleteProfile);

async function getProfile(ctx) {
  try {
    const query = await User.getProfileById(ctx.params.id);
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
    const query = await User.addProfile(params);
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
    const query = await User.updateProfileById(id, params);
    ctx.body = `Update completed with code ${query}`;
    ctx.status = 200;
  } catch (err) {
    ctx.status = 500;
    ctx.body = err.message;
  }
}

async function deleteProfile(ctx) {
  try {
    const query = await User.deleteProfileById(ctx.params.id);
    ctx.body = `Uninstall completed with code ${query}`;
    ctx.status = 200;
  } catch (err) {
    ctx.status = 500;
    ctx.body = err.message;
  }
}

module.exports = router;

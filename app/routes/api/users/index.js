const Router = require('koa-router');
const User = require('../../../entities/users/index');
const { addUserSchema, updateUserSchema } = require('./usersSchema');
const { usersAddValidation, usersUpdateValidation } = require('./usersValidateDto');

const router = new Router({
  prefix: '/users',
});

router
  .get('/:id', getProfile)
  .post('/', usersAddValidation(addUserSchema), postProfile)
  .put('/:id', usersUpdateValidation(updateUserSchema), putProfile)
  .delete('/:id', deleteProfile);

async function getProfile(ctx) {
  // eslint-disable-next-line no-useless-catch
  try {
    const { id } = ctx.params;
    const query = await User.getUserById(id);
    if (query) {
      ctx.body = query;
      ctx.status = 200;
    }
  } catch (err) {
    throw err;
  }
}

async function postProfile(ctx) {
  try {
    const params = ctx.request.body;
    const query = await User.addUser(params);
    ctx.body = query;
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
    const query = await User.updateUserById(id, params);
    ctx.body = query;
    ctx.status = 200;
  } catch (err) {
    ctx.status = 500;
    ctx.body = err.message;
  }
}

async function deleteProfile(ctx) {
  try {
    const query = await User.deleteUserById(ctx.params.id);
    ctx.body = query;
    ctx.status = 200;
  } catch (err) {
    ctx.status = 500;
    ctx.body = err.message;
  }
}

module.exports = router;

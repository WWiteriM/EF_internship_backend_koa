const Router = require('koa-router');
const passport = require('koa-passport');
const FriendEntity = require('../../../entities/friends/index');
const UserEntity = require('../../../entities/users/index');
const { bodyValidate, queryValidate } = require('../../validation');
const {
  getFriendByIdQuerySchema,
  addFriendBodySchema,
  deleteFriendQuerySchema,
} = require('./validationSchemes');

const router = new Router({
  prefix: '/friends',
});

router
  .get(
    '/:id',
    passport.authenticate('jwt', { session: false }),
    queryValidate(getFriendByIdQuerySchema),
    getFriendById,
  )
  .get('/', passport.authenticate('jwt', { session: false }), getFriends)
  .post(
    '/',
    passport.authenticate('jwt', { session: false }),
    bodyValidate(addFriendBodySchema),
    addFriend,
  )
  .delete(
    '/:id',
    passport.authenticate('jwt', { session: false }),
    queryValidate(deleteFriendQuerySchema),
    deleteFriend,
  );

async function getFriendById(ctx) {
  const { id } = ctx.params;
  const userId = ctx.state.user.id;
  ctx.body = await FriendEntity.getFriendById(id, userId);
  ctx.status = 200;
}

async function getFriends(ctx) {
  const { id } = ctx.state.user;
  ctx.body = await FriendEntity.getAllFriends(id);
  ctx.status = 200;
}

async function addFriend(ctx) {
  const { friendId } = ctx.request.body;
  const { id } = ctx.state.user;
  await UserEntity.getUser(friendId);
  ctx.body = await FriendEntity.addNewFriend(id, friendId);
  ctx.status = 201;
}

async function deleteFriend(ctx) {
  const { id } = ctx.params;
  const userId = ctx.state.user.id;
  ctx.body = await FriendEntity.deleteFriendById(id, userId);
  ctx.status = 200;
}

module.exports = router;

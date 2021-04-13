const Friend = require('../../models/friends');
const ErrorService = require('../../middleware/error/errorServices');

async function getFriendById(id, userId) {
  const friend = await Friend.query().findById(id).where('userId', userId);
  if (!friend) {
    throw ErrorService.errorThrow(404);
  }
  return friend;
}

async function getAllFriends(id) {
  const friends = await Friend.query()
    .joinRelated('friends_info')
    .where('friends.userId', id)
    .select('friends.friendId', 'friends_info.name', 'friends_info.surname', 'friends_info.email');
  if (!friends.length) {
    throw ErrorService.errorThrow(404);
  }
  return friends;
}

async function addNewFriend(id, friendId) {
  const friend = await Friend.query().findOne({ friendId }).where('userId', id);
  if (friend || id === friendId) {
    throw ErrorService.errorThrow(400);
  }
  const newFriend = await Friend.query().insert({ userId: id, friendId });
  return newFriend.id;
}

async function deleteFriendById(id, userId) {
  const friend = await Friend.query().deleteById(id).where('userId', userId);
  if (!friend) {
    throw ErrorService.errorThrow(404);
  }
  return id;
}

module.exports = {
  getFriendById,
  getAllFriends,
  addNewFriend,
  deleteFriendById,
};

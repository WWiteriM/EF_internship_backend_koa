const BaseModel = require('../db/baseModel/index');
const User = require('./users');

class Friends extends BaseModel {
  static get tableName() {
    return 'friends';
  }

  static get idColumn() {
    return 'id';
  }

  static get userColumn() {
    return 'userId';
  }

  static get userIdColumn() {
    return 'friendId';
  }

  static get hidden() {
    return ['createdAt', 'updatedAt'];
  }

  static get jsonSchema() {
    return {
      type: 'object',
      properties: {
        id: { type: 'integer' },
        user_id: { type: 'integer' },
        user_name: { type: 'string' },
        user_surname: { type: 'string' },
      },
    };
  }

  static get relationMappings() {
    return {
      friends_info: {
        relation: BaseModel.HasManyRelation,
        modelClass: User,
        join: {
          from: 'users.id',
          to: 'friends.friendId',
        },
      },
    };
  }
}

module.exports = Friends;

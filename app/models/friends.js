const BaseModel = require('../db/baseModel/index');
const User = require('./users');

class Friends extends BaseModel {
  static get tableName() {
    return 'friends';
  }

  static get idColumn() {
    return 'id';
  }

  static get userIdColumn() {
    return 'user_id';
  }

  static get visible() {
    return ['user_id'];
  }

  static get hidden() {
    return ['id', 'createdAt', 'updatedAt'];
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
      user_id: {
        relation: BaseModel.BelongsToOneRelation,
        modelClass: User,
        join: {
          from: 'albums.user_id',
          to: 'users.id',
        },
      },
    };
  }
}

module.exports = Friends;

const BaseModel = require('../db/baseModel/index');
const User = require('./users');

class Albums extends BaseModel {
  static get tableName() {
    return 'albums';
  }

  static get idColumn() {
    return 'id';
  }

  static get nameColumn() {
    return 'name';
  }

  static get userIdColumn() {
    return 'userId';
  }

  static get hidden() {
    return ['userId', 'createdAt', 'updatedAt'];
  }

  static get jsonSchema() {
    return {
      type: 'object',
      properties: {
        id: { type: 'integer' },
        name: { type: 'string' },
        userId: { type: 'integer' },
      },
    };
  }

  static get relationMappings() {
    return {
      album_info: {
        relation: BaseModel.BelongsToOneRelation,
        modelClass: User,
        join: {
          from: 'albums.userId',
          to: 'users.id',
        },
      },
    };
  }
}

module.exports = Albums;

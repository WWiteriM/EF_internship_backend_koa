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

  static get visible() {
    return ['name'];
  }

  static get hidden() {
    return ['id', 'userId', 'createdAt', 'updatedAt'];
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
      info: {
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

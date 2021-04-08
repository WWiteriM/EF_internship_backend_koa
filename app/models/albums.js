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
    return 'user_id';
  }

  static get visible() {
    return ['name'];
  }

  static get hidden() {
    return ['id', 'user_id', 'createdAt', 'updatedAt'];
  }

  static get jsonSchema() {
    return {
      type: 'object',
      properties: {
        id: { type: 'integer' },
        name: { type: 'string' },
        user_id: { type: 'integer' },
      },
    };
  }

  static get relationMappings() {
    return {
      user_id: {
        relation: BaseModel.HasManyRelation,
        modelClass: User,
        join: {
          from: 'albums.user_id',
          to: 'users.id',
        },
      },
    };
  }
}

module.exports = Albums;

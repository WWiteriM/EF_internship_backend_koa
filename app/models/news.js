const BaseModel = require('../db/baseModel/index');
const Users = require('./users');

class News extends BaseModel {
  static get tableName() {
    return 'news';
  }

  static get idColumn() {
    return 'id';
  }

  static get titleColumn() {
    return 'title';
  }

  static get textColumn() {
    return 'text';
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
        title: { type: 'string' },
        text: { type: 'string' },
        user_id: { type: 'integer' },
      },
    };
  }

  static get relationMappings() {
    return {
      user_id: {
        relation: BaseModel.BelongsToOneRelation,
        modelClass: Users,
        join: {
          from: 'news.userId',
          to: 'users.id',
        },
      },
    };
  }
}

module.exports = News;

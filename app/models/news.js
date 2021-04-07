const BaseModel = require('../db/baseModel/index');

class News extends BaseModel {
  static get tableName() {
    return 'news';
  }

  static get visible() {
    return [];
  }

  static get hidden() {
    return ['createdAt', 'updatedAt'];
  }

  static get jsonSchema() {
    return {
      type: 'object',
      properties: {},
    };
  }
}

module.exports = News;

const BaseModel = require('../db/baseModel/index');

class Albums extends BaseModel {
  static get tableName() {
    return 'albums';
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

module.exports = Albums;

const BaseModel = require('../db/baseModel/index');

class Photos extends BaseModel {
  static get tableName() {
    return 'photos';
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

module.exports = Photos;

const BaseModel = require('../db/baseModel/index');

class Messages extends BaseModel {
  static get tableName() {
    return 'messages';
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

module.exports = Messages;

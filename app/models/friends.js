const BaseModel = require('../db/baseModel/index');

class Friends extends BaseModel {
  static get tableName() {
    return 'friends';
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

module.exports = Friends;

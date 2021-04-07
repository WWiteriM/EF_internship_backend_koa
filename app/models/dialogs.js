const BaseModel = require('../db/baseModel/index');

class Dialogs extends BaseModel {
  static get tableName() {
    return 'dialogs';
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

module.exports = Dialogs;

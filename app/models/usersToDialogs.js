const BaseModel = require('../db/baseModel/index');

class UserToDialogs extends BaseModel {
  static get tableName() {
    return 'users_to_dialogs';
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

module.exports = UserToDialogs;

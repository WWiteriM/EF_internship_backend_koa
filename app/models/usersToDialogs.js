const BaseModel = require('../db/baseModel/index');
const User = require('./users');
const Dialog = require('./dialogs');

class UserToDialogs extends BaseModel {
  static get tableName() {
    return 'users_to_dialogs';
  }

  static get idColumn() {
    return 'id';
  }

  static get userIdColumn() {
    return 'user_id';
  }

  static get dialogIdColumn() {
    return 'dialog_id';
  }

  static get hidden() {
    return ['createdAt', 'updatedAt'];
  }

  static get jsonSchema() {
    return {
      type: 'object',
      properties: {
        id: { type: 'integer' },
        user_id: { type: 'integer' },
        dialog_id: { type: 'integer' },
      },
    };
  }

  static get relationMappings() {
    return {
      user_id: {
        relation: BaseModel.HasManyRelation,
        modelClass: User,
        join: {
          from: 'user_to_dialogs.user_id',
          to: 'users.id',
        },
      },

      dialog_id: {
        relation: BaseModel.HasManyRelation,
        modelClass: Dialog,
        join: {
          from: 'user_to_dialogs.dialog_id',
          to: 'dialogs.id',
        },
      },
    };
  }
}

module.exports = UserToDialogs;

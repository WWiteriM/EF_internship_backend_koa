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
    return 'userId';
  }

  static get dialogIdColumn() {
    return 'dialogId';
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
          from: 'user_to_dialogs.userId',
          to: 'users.id',
        },
      },

      dialog_id: {
        relation: BaseModel.HasManyRelation,
        modelClass: Dialog,
        join: {
          from: 'user_to_dialogs.dialogId',
          to: 'dialogs.id',
        },
      },
    };
  }
}

module.exports = UserToDialogs;

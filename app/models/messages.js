const BaseModel = require('../db/baseModel/index');
const Dialog = require('./dialogs');

class Messages extends BaseModel {
  static get tableName() {
    return 'messages';
  }

  static get idColumn() {
    return 'id';
  }

  static get dialogIdColumn() {
    return 'dialogId';
  }

  static get textColumn() {
    return 'text';
  }

  static get hidden() {
    return ['dialogId', 'createdAt', 'updatedAt'];
  }

  static get jsonSchema() {
    return {
      type: 'object',
      properties: {
        id: { type: 'integer' },
        dialog_id: { type: 'integer' },
        text: { type: 'string' },
      },
    };
  }

  static get relationMappings() {
    return {
      dialog_id: {
        relation: BaseModel.HasManyRelation,
        modelClass: Dialog,
        join: {
          from: 'messages.dialogId',
          to: 'dialogs.id',
        },
      },
    };
  }
}

module.exports = Messages;

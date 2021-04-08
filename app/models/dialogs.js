const BaseModel = require('../db/baseModel/index');

class Dialogs extends BaseModel {
  static get tableName() {
    return 'dialogs';
  }

  static get idColumn() {
    return 'id';
  }

  static get nameColumn() {
    return 'name';
  }

  static get visible() {
    return ['name'];
  }

  static get hidden() {
    return ['id', 'createdAt', 'updatedAt'];
  }

  static get jsonSchema() {
    return {
      type: 'object',
      properties: {
        id: { type: 'integer' },
        name: { type: 'string' },
      },
    };
  }
}

module.exports = Dialogs;

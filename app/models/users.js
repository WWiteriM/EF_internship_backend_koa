const BaseModel = require('../db/baseModel/index');

class Users extends BaseModel {
  static get tableName() {
    return 'users';
  }

  static get idColumn() {
    return 'id';
  }

  static get nameColumn() {
    return 'name';
  }

  static get surnameColumn() {
    return 'surname';
  }

  static get emailColumn() {
    return 'email';
  }

  static get passwordColumn() {
    return 'password';
  }

  static get hidden() {
    return [
      'password',
      'token',
      'recoveryPasswordToken',
      'activationToken',
      'createdAt',
      'updatedAt',
    ];
  }

  static get jsonSchema() {
    return {
      type: 'object',
      properties: {
        id: { type: 'integer' },
        name: { type: 'string' },
        surname: { type: 'string' },
        email: { type: 'string' },
        password: { type: 'string', minLength: 4 },
      },
    };
  }
}

module.exports = Users;

const BaseModel = require('../db/baseModel/index');
const Album = require('./albums');

class Photos extends BaseModel {
  static get tableName() {
    return 'photos';
  }

  static get idColumn() {
    return 'id';
  }

  static get pathColumn() {
    return 'path';
  }

  static get descriptionColumn() {
    return 'description';
  }

  static get tagColumn() {
    return 'tag';
  }

  static get albumIdColumn() {
    return 'albumId';
  }

  static get hidden() {
    return ['path', 'albumId', 'createdAt', 'updatedAt'];
  }

  static get jsonSchema() {
    return {
      type: 'object',
      properties: {
        id: { type: 'integer' },
        path: { type: 'string' },
        description: { type: 'string' },
        tag: { type: 'string' },
        album_id: { type: 'integer' },
      },
    };
  }

  static get relationMappings() {
    return {
      album_id: {
        relation: BaseModel.HasManyRelation,
        modelClass: Album,
        join: {
          from: 'photos.albumId',
          to: 'albums.id',
        },
      },
    };
  }
}

module.exports = Photos;

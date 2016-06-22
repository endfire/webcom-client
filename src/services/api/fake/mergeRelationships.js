import { merge, cloneDeep } from 'lodash';
const invalidSchemaError = (type) => new Error(`There is no schema with type '${type}'.`);

const mergeRelationships = (type, record, database, schemas) => {
  if (!(type in schemas)) return invalidSchemaError(type);
  if (!('relationships' in schemas[type])) return {};

  const clone = cloneDeep(record);
  const relationships = schemas[type].relationships;
  const toMerge = {};

  Object.keys(relationships).forEach(field => {
    if (!(field in clone)) return;

    const relationship = relationships[field];
    const ids = clone[field];

    if (relationship.hasMany) {
      const table = relationship.hasMany;
      toMerge[field] = ids.map(id => ({ id, ...database[table][id] }));
      return;
    }

    if (relationship.belongsTo) {
      const table = relationship.belongsTo;
      toMerge[field] = { id: ids, ...database[table][ids] };
      return;
    }
  });

  return merge(clone, toMerge);
};

export default mergeRelationships;

import { v4 } from 'node-uuid';
import { filter } from 'lodash';
import { merge, hash, compare, verifyToken, createToken } from './helpers';
import database from './database';
import schemas from '../schemas';

const delay = (ms) => new Promise(resolve => setTimeout(resolve, ms));
const invalidTypeError = (type) => new Error(`The type '${type}' is invalid.`);
const notFoundError = (type, id) => new Error(`No record of type '${type}' with id '${id}' found.`);

export const create = (type, record) => {
  if (!(type in database)) throw invalidTypeError(type);

  return delay(100).then(() => {
    const id = v4();
    const merged = { ...record, ...merge(type, record, database, schemas) };
    database[type][id] = record;

    return { id, ...merged };
  });
};

export const update = (type, id, data) => {
  if (!(type in database)) throw invalidTypeError(type);
  if (!(id in database[type])) throw notFoundError(type, id);

  return delay(100).then(() => {
    const record = database[type][id];
    database[type][id] = { ...record, ...data };
    const merged = { ...record, ...data };

    return { id, ...merged, ...merge(type, merged, database, schemas) };
  });
};

export const del = (type, id) => {
  if (!(type in database)) throw invalidTypeError(type);
  if (!(id in database[type])) throw notFoundError(type, id);

  return delay(100).then(() => {
    delete database[type][id];
    return true;
  });
};

export const fetch = (type, id) => {
  if (!(type in database)) throw invalidTypeError(type);
  if (!(id in database[type])) throw notFoundError(type, id);
  const record = { id, ...database[type][id] };

  return delay(100).then(() => ({
    ...record,
    ...merge(type, record, database, schemas),
  }));
};

export const find = (type, filters = {}) => {
  if (!(type in database)) throw invalidTypeError(type);

  return delay(100).then(() => {
    const records = Object.keys(database[type]).map(id => ({ id, ...database[type][id] }));
    const filtered = filter(records, filters);

    return filtered.map(record => ({
      id: record.id,
      ...record,
      ...merge(type, record, database, schemas),
    }));
  });
};

export const authSignup = (record) => {
  const password = record.password;
  const createUser = hashedPassword => create({ ...record, password: hashedPassword });

  return hash(password).then(createUser);
};

export const authToken = (email, password) => {
  const compareUserPassword = user => compare(password, user.password);

  return find('user', { email }).then(compareUserPassword).then(createToken);
};

export const authVerify = verifyToken;

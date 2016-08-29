import * as types from 'constants/actionTypes';
import missingRequiredParamError from './missingRequiredParamError';

export const syncStore = (entityType, recordOrRecords, shouldRemove = false) => {
  const type = types.SYNC_STORE;

  if (!entityType) throw missingRequiredParamError(type, 'entityType');
  if (!recordOrRecords) throw missingRequiredParamError(type, 'recordOrRecords');

  const key = Array.isArray(recordOrRecords) ? 'records' : 'record';

  return {
    type,
    payload: {
      shouldRemove,
      type: entityType,
      [key]: recordOrRecords,
    },
  };
};

export const createRecord = (entityType, record) => {
  const type = types.CREATE_REQUEST;

  if (!entityType) throw missingRequiredParamError(type, 'entityType');
  if (!record) throw missingRequiredParamError(type, 'record');

  return {
    type,
    payload: {
      record,
      type: entityType,
    },
  };
};

export const fetchRecord = (entityType, id) => {
  const type = types.FETCH_REQUEST;

  if (!entityType) throw missingRequiredParamError(type, 'entityType');
  if (!id) throw missingRequiredParamError(type, 'id');

  return {
    type,
    payload: {
      id,
      type: entityType,
    },
  };
};

export const findRecords = (entityType, filters = {}) => {
  const type = types.FIND_REQUEST;

  if (!entityType) throw missingRequiredParamError(type, 'entityType');

  return {
    type,
    payload: {
      filters,
      type: entityType,
    },
  };
};

export const updateRecord = (entityType, id, data) => {
  const type = types.UPDATE_REQUEST;

  if (!entityType) throw missingRequiredParamError(type, 'entityType');
  if (!id) throw missingRequiredParamError(type, 'id');
  if (!data) throw missingRequiredParamError(type, 'data');

  return {
    type,
    payload: {
      id,
      data,
      type: entityType,
    },
  };
};

export const deleteRecord = (entityType, entityTypePlural, id) => {
  const type = types.DELETE_REQUEST;

  if (!entityType) throw missingRequiredParamError(type, 'entityType');
  if (!entityTypePlural) throw missingRequiredParamError(type, 'entityTypePlural');
  if (!id) throw missingRequiredParamError(type, 'id');

  return {
    type,
    payload: {
      id,
      type: entityType,
      typePlural: entityTypePlural,
    },
  };
};

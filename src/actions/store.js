/* eslint-disable no-param-reassign */
import * as types from 'constants/actionTypes';
import missingRequiredParamError from './missingRequiredParamError';

export const syncStore = (entityType, recordOrRecords, shouldRemove = false) => {
  const type = types.SYNC_STORE;

  if (!entityType) throw missingRequiredParamError(type, 'entityType');
  if (!recordOrRecords) throw missingRequiredParamError(type, 'recordOrRecords');

  const key = Array.isArray(recordOrRecords) ? 'records' : 'record';

  if (key === 'records') {
    recordOrRecords = recordOrRecords.filter(record => (
      record.meta.archived === false
    ));
  }

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

export const fetchRecord = (entityType, id, options = {}) => {
  const type = types.FETCH_REQUEST;

  if (!entityType) throw missingRequiredParamError(type, 'entityType');
  if (!id) throw missingRequiredParamError(type, 'id');

  return {
    type,
    payload: {
      id,
      options,
      type: entityType,
    },
  };
};

export const findRecords = (entityType, filters = {}, options = {}) => {
  const type = types.FIND_REQUEST;

  if (!entityType) throw missingRequiredParamError(type, 'entityType');

  return {
    type,
    payload: {
      filters,
      options,
      type: entityType,
    },
  };
};

export const fetchRelated = (entityType, id, field, relatedType, options = {}) => {
  const type = types.RELATED_REQUEST;

  if (!entityType) throw missingRequiredParamError(type, 'entityType');
  if (!id) throw missingRequiredParamError(type, 'id');
  if (!field) throw missingRequiredParamError(type, 'field');

  return {
    type,
    payload: {
      id,
      field,
      relatedType,
      options,
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

export const updateAndFetch = (updateType, updateID, updateData, fetchType, fetchID) => {
  const type = types.UPDATEANDFETCH_REQUEST;

  if (!updateType) throw missingRequiredParamError(type, 'updateType');
  if (!updateID) throw missingRequiredParamError(type, 'updateID');
  if (!updateData) throw missingRequiredParamError(type, 'updateData');
  if (!fetchType) throw missingRequiredParamError(type, 'fetchType');
  if (!fetchID) throw missingRequiredParamError(type, 'fetchID');

  return {
    type,
    payload: {
      updateType,
      updateID,
      updateData,
      fetchType,
      fetchID,
    },
  };
};

export const deleteAndFetch = (deleteType, deleteTypePlural, deleteID, fetchType, fetchID) => {
  const type = types.DELETEANDFETCH_REQUEST;

  if (!deleteType) throw missingRequiredParamError(type, 'deleteType');
  if (!deleteTypePlural) throw missingRequiredParamError(type, 'deleteTypePlural');
  if (!deleteID) throw missingRequiredParamError(type, 'deleteID');
  if (!fetchType) throw missingRequiredParamError(type, 'fetchType');
  if (!fetchID) throw missingRequiredParamError(type, 'fetchID');

  return {
    type,
    payload: {
      deleteType,
      deleteTypePlural,
      deleteID,
      fetchType,
      fetchID,
    },
  };
};

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

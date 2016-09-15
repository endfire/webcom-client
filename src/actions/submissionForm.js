import * as types from 'constants/actionTypes';
import missingRequiredParamError from './missingRequiredParamError';

export const initializeSubmissionForm = (formID) => {
  const type = types.INITIALIZE_SUBMISSION_FORM_REQUEST;

  if (!formID) throw missingRequiredParamError(type, 'formID');

  return {
    type,
    payload: {
      formID,
    },
  };
};

export const initializeSubmissionFormItems = (formID) => {
  const type = types.INITIALIZE_SUBMISSION_FORM_ITEMS_REQUEST;

  if (!formID) throw missingRequiredParamError(type, 'formID');

  return {
    type,
    payload: {
      formID,
    },
  };
};

export const editSubmissionForm = (formID, name, value) => {
  const type = types.EDIT_SUBMISSION_FORM;

  if (!formID) throw missingRequiredParamError(type, 'formID');
  if (!name) throw missingRequiredParamError(type, 'name');
  if (!value) throw missingRequiredParamError(type, 'value');

  return {
    type,
    payload: {
      formID,
      name,
      value,
    },
  };
};

export const submitSubmissionForm = (formID) => {
  const type = types.SUBMIT_SUBMISSION_FORM;

  if (!formID) throw missingRequiredParamError(type, 'formID');

  return {
    type,
    payload: {
      formID,
    },
  };
};

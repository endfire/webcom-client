import * as types from 'constants/actionTypes';
import missingRequiredParamError from './missingRequiredParamError';

export const hydrateSubmissionForm = (formID) => {
  const type = types.HYDRATE_SUBMISSION_FORM;

  if (!formID) throw missingRequiredParamError(type, 'formID');

  return {
    type,
    payload: {
      formID,
    },
  };
};

export const initializeSubmissionFormItems = (formID) => {
  const type = types.INITIALIZE_SUBMISSION_FORM_ITEMS;

  if (!formID) throw missingRequiredParamError(type, 'formID');

  return {
    type,
    payload: {
      formID,
    },
  };
};

export const editSubmissionFormField = (formID, name, value) => {
  const type = types.EDIT_SUBMISSION_FORM_FIELD;

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

export const editSubmissionFormCheckbox = (formID, name, value) => {
  const type = types.EDIT_SUBMISSION_FORM_CHECKBOX;

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

export const editSubmissionFormPayment = (formID, name, value) => {
  const type = types.EDIT_SUBMISSION_FORM_PAYMENT;

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

export const editSubmissionFormItem = (formID, name, value) => {
  const type = types.EDIT_SUBMISSION_FORM_ITEM;

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

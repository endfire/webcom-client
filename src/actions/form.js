import * as types from 'constants/actionTypes';
import missingRequiredParamError from './missingRequiredParamError';

export const initializeForm = (form, initialValues = {}, validation = {}) => {
  const type = types.INITIALIZE_FORM;

  if (!form) throw missingRequiredParamError(type, 'form');

  return {
    type,
    payload: {
      form,
      initialValues,
      validation,
    },
  };
};

export const revertForm = (form) => {
  const type = types.REVERT_FORM;

  if (!form) throw missingRequiredParamError(type, 'form');

  return {
    type,
    payload: {
      form,
    },
  };
};

export const changeForm = (form, name, value = '', validation = {}) => {
  const type = types.CHANGE_FORM;

  if (!form) throw missingRequiredParamError(type, 'form');
  if (!name) throw missingRequiredParamError(type, 'name');

  return {
    type,
    payload: {
      form,
      name,
      value,
      validation,
    },
  };
};

export const submitFormRequest = (form) => {
  const type = types.SUBMIT_FORM_REQUEST;

  if (!form) throw missingRequiredParamError(type, 'form');

  return {
    type,
    payload: {
      form,
    },
  };
};

export const submitFormError = (form, err) => {
  const type = types.SUBMIT_FORM_ERROR;

  if (!form) throw missingRequiredParamError(type, 'form');

  return {
    type,
    payload: {
      err,
      form,
    },
    error: true,
  };
};

export const submitFormSuccess = (form) => {
  const type = types.SUBMIT_FORM_SUCCESS;

  if (!form) throw missingRequiredParamError(type, 'form');

  return {
    type,
    payload: {
      form,
    },
  };
};

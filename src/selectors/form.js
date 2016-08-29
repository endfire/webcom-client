import { createSelector } from 'reselect';

const getStateForm = (state) => state.form;

export const getFields = (form) => (
  createSelector(
    [getStateForm],
    (stateForm) => stateForm.getIn([form, 'current'])
  )
);

export const getFormError = createSelector(
  [getStateForm],
  (stateForm) => stateForm.get('error')
);

export const getRecordID = (form) => (
  createSelector(
    [getStateForm],
    (stateForm) => stateForm.getIn([form, 'recordID'])
  )
);

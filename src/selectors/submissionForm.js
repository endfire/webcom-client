import { createSelector } from 'reselect';

const getSubmissionForm = (state) => state.submissionForm;

export const getLastSubmissionFormError = createSelector(
  [getSubmissionForm],
  (submissionForm) => submissionForm.get('errors').last(),
);

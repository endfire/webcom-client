import * as types from 'constants/actionTypes';

export default (formName) => {
  const actionType = types[`SUBMIT_${formName}_FORM`];

  if (!actionType) {
    throw new Error(
      `Tried to submit a form with name ${formName}, but that form name doesn't have a registerd ` +
      `action type constant. Please add 'SUBMIT_${formName}_FORM' to the action types.`
    );
  }

  return actionType;
};

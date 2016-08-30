import { Map } from 'immutable';
import isValueValid from './isValueValid';

export default (initialValues, validation) => {
  const values = {};

  Object.keys(initialValues).forEach(key => {
    const value = initialValues[key];
    const isValid = isValueValid(key, value, validation);

    values[key] = Map({
      value: initialValues[key],
      isTouched: false,
      isValid,
    });
  });

  return Map(values);
};

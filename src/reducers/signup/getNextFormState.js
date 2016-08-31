import { Map, List } from 'immutable';
import zxcvbn from 'zxcvbn';
import isNameValid from './isNameValid';
import isEmailValid from './isEmailValid';

export default (state, action) => {
  const { payload: { field, value } } = action;

  switch (field.get('name')) {
    case 'name':
      return state.setIn(['form', 'name'], Map({
        name: 'name',
        didStartTyping: true,
        isValid: isNameValid(value),
        value,
      }));

    case 'email':
      return state.setIn(['form', 'email'], Map({
        name: 'email',
        didStartTyping: true,
        isValid: isEmailValid(value),
        value,
      }));

    case 'password': {
      const { score, feedback: { warning, suggestions } } = zxcvbn(value);

      return state
        .setIn(['form', 'password'], Map({
          name: 'password',
          didStartTyping: true,
          feedback: Map({
            suggestions: List(suggestions),
            warning,
          }),
          score,
          value,
        }))
        .updateIn(['form', 'confirm'], confirm =>
          confirm.set('isValid', confirm.get('value') === value)
        );
    }

    case 'confirm':
      return state.setIn(['form', 'confirm'], Map({
        name: 'confirm',
        didStartTyping: true,
        isValid: value === state.getIn(['form', 'password', 'value']),
        value,
      }));

    default:
      return state;
  }
};

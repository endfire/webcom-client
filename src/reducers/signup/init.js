import { Map, List } from 'immutable';

export const initField = (name) => Map({
  name,
  value: '',
  isValid: false,
  didStartTyping: false,
});

export const initPassword = () => Map({
  name: 'password',
  value: '',
  didStartTyping: false,
  score: 0,
  feedback: Map({
    warning: '',
    suggestions: List(),
  }),
});

export default Map({
  id: '',
  field: '',
  role: '',
  isLoading: false,
  requests: List(),
  errors: List(),
  successes: List(),
  form: Map({
    name: initField('name'),
    email: initField('email'),
    confirm: initField('confirm'),
    password: initPassword(),
  }),
});

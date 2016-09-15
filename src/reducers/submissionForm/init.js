import { Map, List } from 'immutable';

const choices = Map({
  submissionForm: List(),
  submissionFormItems: List(),
});

export default Map({
  requests: choices,
  errors: choices,
  successes: choices,
  submissions: List(),
});

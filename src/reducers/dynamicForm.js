import { Map, List } from 'immutable';
/* import {
} from '../actionTypes';*/

/**
 * So, I'm thinking the Editor and Display will just update the display piece of state. isEditing
 * will basically determine if actual inputs (not inputs changing labels, etc.) are disabled or not.
 * Since you would not want to change the value of an input when using FormEditor.
 */

// they can only edit one form at a time. So, just pull out the current form id and update that
// dynamic form state info

const init = Map({
  formID: '',
  isEditing: true, // disable value for actual inputs, etc.
  fields: List(),
});

// this list will have many Maps with the following structure (which could be a propTypes 'shape')
// Map({
//  type: textInput, textArea, select, checkbox, radio
//  value:
//  placeholder:
//  label:
//  ...perhaps more
// })

export default (state = init, action) => {
  const { type, payload } = action;

  switch (type) {
    case 'SOME_ACTION':
      return state;
    default:
      return state;
  }
};

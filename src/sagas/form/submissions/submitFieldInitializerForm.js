import { takeEvery, delay } from 'redux-saga';
import { put } from 'redux-saga/effects';
import store from 'configureStore';
import * as actions from 'actions/store';
import { submitFormError, submitFormSuccess } from 'actions/form';
import * as types from 'constants/actionTypes';
import * as templates from 'data/templates';

const getTemplateById = (id) => {
  let matchedTemplate;

  Object.keys(templates).forEach(template => {
    if (templates[template].id === `${id}`) {
      matchedTemplate = templates[template];
    }
  });

  return matchedTemplate || false;
};

function* submitFieldInitializerForm(action) {
  const { form } = action.payload;
  const state = store.getState();
  const template = state.form.getIn([form, 'current', 'template']);
  const id = state.form.getIn([form, 'current', 'id', 'value']);

  try {
    if (!template.get('isValid')) {
      throw new Error(
        'A template is required for creating a new form'
      );
    }

    const { fields, payment } = getTemplateById(template.get('value'));

    for (const field of fields) {
      yield delay(150);

      yield put(actions.createRecord('field', {
        ...field,
        form: id,
      }));
    }

    if (payment) {
      yield put(actions.createRecord('payment', {
        form: id,
      }));
    }

    yield put(actions.updateRecord('form', id, {
      didInitialize: true,
    }));
    yield put(submitFormSuccess(form));
  } catch (err) {
    yield put(submitFormError(form, err));
  }
}

export default function* watchFieldInitializerFormSubmit() {
  yield* takeEvery(types.SUBMIT_FIELD_INITIALIZER_FORM, submitFieldInitializerForm);
}

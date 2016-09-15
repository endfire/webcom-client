import { takeEvery, delay } from 'redux-saga';
import { put } from 'redux-saga/effects';
import store from 'configureStore';
import { api } from 'services/api';
import { syncStore } from 'actions/store';
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

      const createdField = yield api.create('field', {
        ...field,
        form: id,
      });

      yield put(syncStore('field', createdField));
    }

    if (payment) {
      console.log('yay payment!!!');
      yield api.create('payment', {
        form: id,
      });
    }

    const updatedForm = yield api.update('form', id, {
      didInitialize: true,
    });

    yield put(syncStore('form', updatedForm));
    yield put(submitFormSuccess(form));
  } catch (err) {
    yield put(submitFormError(form, err));
  }
}

export default function* watchFieldInitializerFormSubmit() {
  yield* takeEvery(types.SUBMIT_FIELD_INITIALIZER_FORM, submitFieldInitializerForm);
}

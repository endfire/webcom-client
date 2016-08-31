import * as storeSagas from './store';
import * as formSagas from './form';
import * as sessionSagas from './session';
import * as signupSagas from './signup';

const mapImportsToArray = (imports) => Object.keys(imports).map(key => imports[key]());

export default function*() {
  yield [
    ...mapImportsToArray(storeSagas),
    ...mapImportsToArray(formSagas),
    ...mapImportsToArray(sessionSagas),
    ...mapImportsToArray(signupSagas),
  ];
}

import * as storeSagas from './store';
import * as formSagas from './form';
import * as sessionSagas from './session';

const mapImportsToArray = (imports) => Object.keys(imports).map(key => imports[key]());

export default function*() {
  yield [
    ...mapImportsToArray(storeSagas),
    ...mapImportsToArray(formSagas),
    ...mapImportsToArray(sessionSagas),
  ];
}

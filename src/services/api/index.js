/* import temp from './store';

export { temp as api };*/
import Redink from '../../../../redink-sdk/dist';

const api = new Redink({
  host: 'http://localhost:4200',
});

export { api };

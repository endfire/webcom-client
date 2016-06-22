import test from 'ava';
import mergeRelationships from '../../../../src/services/api/fake/mergeRelationships';
import { database, schemas } from './helpers';

test('can mergeRelationships with complete relationships', t => {
  const record = { id: '1', ...database.user['1'] };
  const merged = mergeRelationships('user', record, database, schemas);

  const expected = {
    id: '1',
    name: 'Dylan',
    email: 'dylanslack@gmail.com',
    company: {
      id: '1',
      name: 'Apple',
      employees: ['1'],
    },
    blogs: [{
      id: '1',
      author: '1',
      title: 'Top 5 Networking Tips',
    }, {
      id: '2',
      author: '1',
      title: 'React for Beginners',
    }],
  };

  t.deepEqual(merged, expected, 'merged record has valid json');
});

test('can mergeRelationships with incomplete relationships', t => {
  const record = { id: '2', ...database.user['2'] };
  const merged = mergeRelationships('user', record, database, schemas);

  const expected = {
    id: '2',
    name: 'Bob',
    email: 'bobjones@gmail.com',
  };

  t.deepEqual(merged, expected, 'merged record has valid json');
});

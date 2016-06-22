import test from 'ava';
import { create, fetch, find, update, del } from '../../../../src/services/api/fake';
import database from '../../../../src/services/api/fake/database';

test('create and fetch', async t => {
  const created = await create('user', { name: 'Dylan', email: 'dylanslack@gmail.com' });
  const fetched = await fetch('user', created.id);

  const expected = {
    id: created.id,
    name: 'Dylan',
    email: 'dylanslack@gmail.com',
  };

  t.deepEqual(created, expected, 'created object has correct json');
  t.deepEqual(fetched, expected, 'fetched object has correct json');
});

test('find', async t => {
  const found = await find('user');
  const filtered = await find('user', { email: 'dylanslack@gmail.com' });
  const notFound = await find('user', { email: 'invalid@email.com' });

  const expected = [{
    id: found[0].id,
    name: 'Dylan',
    email: 'dylanslack@gmail.com',
  }];

  t.deepEqual(found, expected, 'found array has correct structure');
  t.deepEqual(filtered, expected, 'filtered array has correct structure');
  t.deepEqual(notFound, [], 'filtered array has correct structure');
});

test('update', async t => {
  const found = await find('user');
  const updated = await update('user', found[0].id, { name: 'Dy-lon' });

  const expected = {
    id: updated.id,
    name: 'Dy-lon',
    email: 'dylanslack@gmail.com',
  };

  t.deepEqual(updated, expected, 'updated object has correct json');
});

test('delete', async t => {
  const found = await find('user');
  const deleted = await del('user', found[0].id);

  t.is(deleted, true, 'object was correctly deleted');
  t.is(Object.keys(database.user).length, 0, 'all users are gone');
});

test('create, fetch, update, find with relationships', async t => {
  const apple = await create('company', { name: 'Apple' });
  const ibm = await create('company', { name: 'IBM' });
  const obg = await create('obg', {});
  const led = await create('category', { name: 'LED' });
  const magnets = await create('category', { name: 'Magnets' });

  const created = await create('listing', {
    company: apple.id,
    obg: obg.id,
    categories: [led.id],
  });

  const updated = await update('listing', created.id, {
    company: ibm.id,
    categories: [led.id, magnets.id],
  });

  const fetched = await fetch('listing', created.id);
  const found = await find('listing');

  const createdExpected = {
    id: created.id,
    company: {
      id: apple.id,
      name: 'Apple',
    },
    obg: {
      id: obg.id,
    },
    categories: [{
      id: led.id,
      name: 'LED',
    }],
  };

  const updatedExpected = {
    id: created.id,
    company: {
      id: ibm.id,
      name: 'IBM',
    },
    obg: {
      id: obg.id,
    },
    categories: [{
      id: led.id,
      name: 'LED',
    }, {
      id: magnets.id,
      name: 'Magnets',
    }],
  };

  const foundExpected = [updatedExpected];

  t.deepEqual(created, createdExpected, 'created object has correct json');
  t.deepEqual(updated, updatedExpected, 'updated object has correct json');
  t.deepEqual(fetched, updatedExpected, 'fetched object has correct json');
  t.deepEqual(found, foundExpected, 'fetched object has correct json');
});

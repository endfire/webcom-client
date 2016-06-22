export const schemas = {
  user: {
    attributes: {},
    relationships: {
      company: { belongsTo: 'company' },
      blogs: { hasMany: 'blog' },
    },
  },
  company: {
    attributes: {},
    relationships: {
      employees: { hasMany: 'user' },
    },
  },
  blog: {
    attributes: {},
    relationships: {
      author: { belongsTo: 'user' },
    },
  },
};

export const database = {
  user: {
    1: {
      name: 'Dylan',
      email: 'dylanslack@gmail.com',
      company: '1',
      blogs: ['1', '2'],
    },
    2: {
      name: 'Bob',
      email: 'bobjones@gmail.com',
    },
  },
  company: {
    1: {
      name: 'Apple',
      employees: ['1'],
    },
  },
  blog: {
    1: {
      title: 'Top 5 Networking Tips',
      author: '1',
    },
    2: {
      title: 'React for Beginners',
      author: '1',
    },
  },
};

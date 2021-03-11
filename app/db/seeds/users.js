exports.seed = async function (knex) {
  await knex('users').insert([
    {
      id: 1,
      name: 'Arsenii',
      surname: 'Mingazov',
      email: 'mingazov-201@bk.ru',
      password: '12345',
    },
    {
      id: 2,
      name: 'Dima',
      surname: 'Fedorov',
      email: 'fedoznik@mail.com',
      password: '54321',
    },
    {
      id: 3,
      name: 'Dasha',
      surname: 'Titovec',
      email: 'd.tit@bk.ru',
      password: '11111',
    },
  ]);
};

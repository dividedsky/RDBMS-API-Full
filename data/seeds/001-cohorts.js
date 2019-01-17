exports.seed = function (knex, Promise) {
  // Deletes ALL existing entries
  return knex('cohorts').truncate()
    .then(() => knex('cohorts').insert([
      { name: 'WEB15' },
      { name: 'WEB14' },
      { name: 'DS1' },
      { name: 'iOS1' },
      { name: 'ML2' },
      { name: 'FSW15' },
      { name: 'Cooking101' },
      { name: 'UX2' },
    ]));
};

exports.seed = function (knex, Promise) {
  // Deletes ALL existing entries
  return knex('students').truncate()
    .then(() => knex('students').insert([
      { name: 'justin', cohort_id: 1 },
      { name: 'bobby', cohort_id: 2 },
      { name: 'ed', cohort_id: 1 },
      { name: 'roger', cohort_id: 2 },
      { name: 'kieran', cohort_id: 6 },
      { name: 'wilbur', cohort_id: 5 },
      { name: 'james', cohort_id: 8 },
      { name: 'scott', cohort_id: 1 },
      { name: 'emilie', cohort_id: 7 },
      { name: 'jack', cohort_id: 2 },
      { name: 'catherine', cohort_id: 3 },
      { name: 'caroline', cohort_id: 4 },
    ]));
};

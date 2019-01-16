exports.up = function (knex, Promise) {
  return knex.schema.createTable('students', (tbl) => {
    tbl.increments();
    tbl.text('name').notNullable();
    tbl.integer('cohort_id')
      .unsigned();
    tbl.foreign('cohort_id')
      .references('id')
      .inTable('cohorts');
  });
};

exports.down = function (knex, Promise) {
  return knex.schema.dropTableIfExists('students');
};

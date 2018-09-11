exports.up = function (knex, Promise) {
  return knex.schema.createTable('comments', function (table) {
    table.increments('id').unsigned().primary();
    table.string('name').notNullable();
    table.string('body').notNullable();
    table.integer('course_id').unsigned().notNullable();

    table.timestamps(true, true);

    table.foreign('course_id').references('id').inTable('courses');
  });
};

exports.down = function (knex, Promise) {
  return knex.schema.dropTable('comments');
};

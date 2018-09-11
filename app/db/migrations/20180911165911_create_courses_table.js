exports.up = function(knex, Promise) {
  return knex.schema.createTable('courses', function (table) {
    table.increments('id').unsigned().primary();
    table.string('title').notNullable();
    table.string('description').notNullable();
    table.integer('professor_id').unsigned().notNullable();
    table.float('rating').notNullable().defaultTo(0);

    table.timestamps(true, true);

    table.foreign('professor_id').references('id').inTable('professors');
  });
};

exports.down = function(knex, Promise) {
  return knex.schema.dropTable('courses');
};

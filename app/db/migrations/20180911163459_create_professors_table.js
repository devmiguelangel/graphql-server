exports.up = function(knex, Promise) {
  return knex.schema.createTable('professors', function (table) {
    table.increments('id').unsigned().primary();
    table.string('name').notNullable();
    table.string('nationality').notNullable();
    table.enu('gender', ['MASCULINO', 'FEMENINO'])

    table.timestamps(true, true);
  });
};

exports.down = function(knex, Promise) {
  return knex.schema.dropTable('professors');
};

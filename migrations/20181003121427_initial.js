exports.up = function(knex, Promise) {
  return Promise.all([
    knex.schema.createTable('projects', function(table) {
      table.increments('id').primary();
      table.string('project_name');

      table.timestamps(true, true);
    }),

    knex.schema.createTable('palettes', function(table) {
      table.increments('id').primary();
      table.string('palette_name');
      table.integer('project_id').unsigned();
      table.foreign('project_id').references('projects.id');
      table.string('color1');
      table.string('color2');
      table.string('color3');
      table.string('color4');
      table.string('color5');

      table.timestamps(true, true);
    })
  ]);
};

exports.down = function(knex, Promise) {
  return Promise.all([
    knex.schema.dropTable('palettes'),
    knex.schema.dropTable('projects')
  ]);
};

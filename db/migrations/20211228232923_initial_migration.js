exports.up = (knex) => {
  return knex.schema
    .createTable('sightings', (table) => {
      // best practice for postgres id fields
      // https://github.com/knex/knex/issues/3635
      table.specificType(
        'id',
        'integer GENERATED ALWAYS AS IDENTITY',
      );
      table.primary('id');
      table.timestamp('sighted_at').notNullable();
      table.text('location').notNullable();
      table.text('common_name').notNullable();
      table.integer('count').notNullable();
      table.text('notes');
    });
};

exports.down = (knex) => {
  
};

exports.up = function (knex) {
  return knex.schema.createTable("countries", (table) => {
    table.string("id").unique().primary(),
      table.string("name").unique(),
      table.string("country_code", 2),
      table
        .dateTime("created_at")
        .notNullable()
        .defaultTo(knex.raw("CURRENT_TIMESTAMP"));
    table
      .dateTime("updated_at")
      .notNullable()
      .defaultTo(knex.raw("CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP"));
  });
};

exports.down = function (knex) {
  return knex.schema.dropTable("countries");
};

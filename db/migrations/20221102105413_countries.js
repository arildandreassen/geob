exports.up = function (knex) {
  return knex.schema.createTable("countries", (table) => {
    table.string("id").unique().primary(),
      table.string("name").unique(),
      table.string("country_code", 2),
      table.timestamp("created_at"),
      table.timestamp("updated_at");
  });
};

exports.down = function (knex) {
  return knex.schema.dropTable("countries");
};

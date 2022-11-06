exports.up = function (knex) {
  return knex.schema.createTable("countries", (table) => {
    table.increments("id").unsigned().primary(),
      table.string("country_name"),
      table.timestamp("created_at"),
      table.timestamp("updated_at");
  });
};

exports.down = function (knex) {
  return knex.schema.dropTable("countries");
};

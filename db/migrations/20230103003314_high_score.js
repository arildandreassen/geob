exports.up = function (knex) {
  return knex.schema.createTable("highscores", (table) => {
    table.increments("id").primary(),
      table.string("name"),
      table.integer("score"),
      table.timestamp("created_at").notNullable().defaultTo(knex.fn.now()),
      table.timestamp("updated_at").notNullable().defaultTo(knex.fn.now());
  });
};

exports.down = function (knex) {
  return knex.schema.dropTable("highscores");
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.seed = async function (knex) {
  // Deletes ALL existing entries
  await knex("countries").del();
  await knex("countries").insert([
    { id: 1, country_name: "norway" },
    { id: 2, country_name: "sweden" },
    { id: 3, country_name: "denmark" },
  ]);
};

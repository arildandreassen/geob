/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.seed = async function (knex) {
  // Deletes ALL existing entries
  await knex("countries").del();
  await knex("countries").insert([
    { country_name: "norway" },
    { country_name: "sweden" },
    { country_name: "denmark" },
  ]);
};

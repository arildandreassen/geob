/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.seed = async function (knex) {
  // Deletes ALL existing entries
  await knex("countries").truncate();
  await knex("countries").insert([
    { country_name: "norway", created_at: new Date(), updated_at: new Date() },
    { country_name: "sweden", created_at: new Date(), updated_at: new Date() },
    { country_name: "denmark", created_at: new Date(), updated_at: new Date() },
  ]);
};

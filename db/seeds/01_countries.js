// https://www.un.org/en/about-us/member-states

const countries = require("./countries.json");

const preparedCountries = countries.map(({ id, name, country_code }) => {
  return {
    id,
    name,
    country_code,
    created_at: new Date(),
    updated_at: new Date(),
  };
});

exports.seed = async function (knex) {
  // Deletes ALL existing entries
  await knex("countries").truncate();
  // Then re-seed with values
  await knex("countries").insert(preparedCountries);
};

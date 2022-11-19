require("dotenv").config();

const environment = process.env.NODE_ENV || "local";
const config = require("../knexfile")[environment];
const knex = require("knex")(config);

module.exports = knex;

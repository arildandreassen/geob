require("dotenv").config();
const path = require("path");

module.exports = {
  local: {
    client: "postgresql",
    pool: { min: 1, max: 5 },
    connection: process.env.DATABASE_URL_LOCAL,
    migrations: {
      directory: path.join(__dirname, "db", "migrations"),
    },
    seeds: {
      directory: path.join(__dirname, "db", "seeds"),
    },
  },
  dev: {
    client: "postgresql",
    pool: { min: 1, max: 5 },
    connection: process.env.DATABASE_URL_DEV,
    migrations: {
      directory: path.join(__dirname, "db", "migrations"),
    },
    seeds: {
      directory: path.join(__dirname, "db", "seeds"),
    },
  },
};

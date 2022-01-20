import { Knex } from "knex";
import _config from "../config";
const config: Knex.Config = {
  client: _config.database.client,
  connection: {
    host : _config.database.host,
    port : _config.database.port,
    user : _config.database.user,
    password : _config.database.password,
    database : _config.database.name
  },
  pool: {
    min: 2,
    max: 10,
  },
  migrations: {
    tableName: "knex_migrations",
    directory: "./migrations",
  },
};

export default config;
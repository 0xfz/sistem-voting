"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var config_1 = __importDefault(require("../config"));
var config = {
    client: config_1.default.database.client,
    connection: {
        host: config_1.default.database.host,
        port: config_1.default.database.port,
        user: config_1.default.database.user,
        password: config_1.default.database.password,
        database: config_1.default.database.name
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
exports.default = config;

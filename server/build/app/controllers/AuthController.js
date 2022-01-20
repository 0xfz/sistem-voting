"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var generator_1 = require("../../core/generator");
var jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
var index_1 = __importDefault(require("../../database/index"));
var config_1 = __importDefault(require("../../config"));
var lodash_1 = __importDefault(require("lodash"));
var joi_1 = __importDefault(require("joi"));
function AuthController() {
    return {
        login: function (req, res) {
            var schema = joi_1.default.object({
                nisn: joi_1.default.string().required(),
                nis: joi_1.default.string().required()
            });
            var validate = schema.validate(req.body);
            if (lodash_1.default.has(validate, "error")) {
                return res.json((0, generator_1.generateError)("Input error"));
            }
            var nisn = req.body.nisn;
            var nis = req.body.nis;
            index_1.default.table("users").where("nisn", "=", nisn).andWhere("nis", "=", nis).then(function (users) {
                console.log(users);
                if (!users.length) {
                    return res.json((0, generator_1.generateError)("NIS/NISN tidak ditemukan"));
                }
                var payload = {
                    user_data: users[0]
                };
                var token = jsonwebtoken_1.default.sign(payload, config_1.default.secret, { expiresIn: "24h" });
                return res.json((0, generator_1.generateSuccess)("Login Success", { token: token }));
            });
        }
    };
}
exports.default = AuthController();

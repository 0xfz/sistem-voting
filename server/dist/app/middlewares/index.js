"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.allowedRole = exports.authenticated = void 0;
var generator_1 = require("../../core/generator");
var jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
var config_1 = __importDefault(require("../../config"));
var database_1 = __importDefault(require("../../database"));
var authenticated = function (req, res, next) {
    var authorization_header = req.headers["authorization"];
    if (!authorization_header)
        return res.json((0, generator_1.generateError)("Tidak ada authorization parameter pada header"));
    var jwtToken = authorization_header === null || authorization_header === void 0 ? void 0 : authorization_header.split(" ")[1];
    if (jwtToken == null)
        return res.json((0, generator_1.generateError)("Token kosong"));
    jsonwebtoken_1.default.verify(jwtToken, config_1.default.secret, function (err, user_id) {
        console.log(err);
        if (err != null)
            return res.json((0, generator_1.generateError)("Ga bisa bro"));
        var user_data = (0, database_1.default)("users").where("id", user_id === null || user_id === void 0 ? void 0 : user_id.user_data.id);
        user_data.then(function (data) {
            req.currentUser = data[0];
            res.locals.user = data[0];
            next();
        });
    });
};
exports.authenticated = authenticated;
var allowedRole = function (role) {
    return function (req, res, next) {
        var _a;
        if (((_a = res.locals.user) === null || _a === void 0 ? void 0 : _a.role) != role) {
            return res.json((0, generator_1.generateError)("Ga bisa bro"));
        }
        next();
    };
};
exports.allowedRole = allowedRole;

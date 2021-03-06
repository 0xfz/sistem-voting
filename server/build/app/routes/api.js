"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var express_1 = require("express");
var AuthController_1 = __importDefault(require("../controllers/AuthController"));
var CategoryController_1 = __importDefault(require("../controllers/CategoryController"));
var VoteController_1 = __importDefault(require("../controllers/VoteController"));
var VotersController_1 = __importDefault(require("../controllers/VotersController"));
var middlewares_1 = require("../middlewares");
var api = (0, express_1.Router)();
api.post("/login", AuthController_1.default.login);
api.post("/vote", middlewares_1.authenticated, (0, middlewares_1.allowedRole)("voter"), VoteController_1.default.vote);
api.get("/kategori/:category_id/hasil", [middlewares_1.authenticated, (0, middlewares_1.allowedRole)("admin")], CategoryController_1.default.result);
api.post("/voter/addBulk", middlewares_1.authenticated, (0, middlewares_1.allowedRole)("admin"), VotersController_1.default.addBulk);
api.get("/kategori", CategoryController_1.default.all);
api.get("/kategori/candidates", CategoryController_1.default.getAllCandidates);
api.get("/info", VoteController_1.default.info);
exports.default = api;

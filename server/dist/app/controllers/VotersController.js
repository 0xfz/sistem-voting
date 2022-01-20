"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var generator_1 = require("../../core/generator");
var database_1 = __importDefault(require("../../database"));
function VotersController() {
    return {
        addBulk: function (req, res) {
            var _a;
            var fileInfo = (_a = req.files) === null || _a === void 0 ? void 0 : _a.jsonData;
            var bufferData = fileInfo.data;
            var json = JSON.parse((bufferData.toString()));
            console.log(json.data[0], 213124124);
            database_1.default.batchInsert("users", json.data).then(function () {
                return res.json((0, generator_1.generateSuccess)("siap di santap bang"));
            });
        }
    };
}
exports.default = VotersController();

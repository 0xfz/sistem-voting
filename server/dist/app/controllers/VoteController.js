"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var lodash_1 = __importDefault(require("lodash"));
var generator_1 = require("../../core/generator");
var database_1 = __importDefault(require("../../database"));
function VoteController() {
    return {
        info: function (req, res) {
            (0, database_1.default)("votes").select(database_1.default.raw("count(*) as suara_masuk")).then(function (data) {
                return res.json((0, generator_1.generateSuccess)("Success", {
                    "suara_masuk": data[0]["suara_masuk"]
                }));
            });
        },
        vote: function (req, res) {
            var _a, _b, _c;
            var currentUserID = (_a = req.currentUser) === null || _a === void 0 ? void 0 : _a.id;
            var dataInput = req.body.data;
            console.log((_b = req.currentUser) === null || _b === void 0 ? void 0 : _b.has_voted);
            if (((_c = req.currentUser) === null || _c === void 0 ? void 0 : _c.has_voted) == "1") {
                return res.json((0, generator_1.generateError)("anda sudah voting"));
            }
            (0, database_1.default)("candidates").select("id", "category_id").then(function (data) {
                data = JSON.parse(JSON.stringify(data));
                var candidates = lodash_1.default.groupBy(data, 'category_id');
                console.log(candidates);
                if (dataInput.length != Object.keys(candidates).length) {
                    return res.json((0, generator_1.generateError)("candidates length tidak sama"));
                }
                var dataInsert = [];
                var _loop_1 = function (i) {
                    var value = dataInput[i];
                    if (!lodash_1.default.has(candidates, value.category_id)) {
                        return { value: res.json((0, generator_1.generateError)("candidates tidak sama dengan kategori id")) };
                    }
                    if (candidates[value.category_id].findIndex(function (candidate) { return candidate.id == value.candidate_id; }) < 0) {
                        return { value: res.json((0, generator_1.generateError)("Invalid input data")) };
                    }
                    value.user_id = currentUserID;
                    dataInsert.push(value);
                };
                for (var i = 0; i < dataInput.length; i++) {
                    var state_1 = _loop_1(i);
                    if (typeof state_1 === "object")
                        return state_1.value;
                }
                (0, database_1.default)("votes").insert(dataInsert).then(function (data) {
                    (0, database_1.default)("users").where("id", currentUserID).update({
                        has_voted: true
                    }).then(function () {
                        return res.json((0, generator_1.generateSuccess)("Success Voted"));
                    }).catch(function () {
                        return res.json((0, generator_1.generateError)("Err"));
                    });
                }).catch(function () {
                    return res.json((0, generator_1.generateError)("Err"));
                });
            });
        }
    };
}
exports.default = VoteController();

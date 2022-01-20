"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var generator_1 = require("../../core/generator");
var database_1 = __importDefault(require("../../database"));
var lodash_1 = __importDefault(require("lodash"));
var dataCache = {};
function CategoryController() {
    return {
        all: function (req, res) {
            (0, database_1.default)("category").select("*").then(function (data) {
                return res.send((0, generator_1.generateSuccess)("ok", data));
            }).catch(function () {
                return res.send((0, generator_1.generateError)("Unexpected Error"));
            });
        },
        getAllCandidates: function (req, res) {
            (0, database_1.default)("candidates").select("*").then(function (data) {
                var result = JSON.parse(JSON.stringify(lodash_1.default.groupBy(data, "category_id")));
                result = lodash_1.default.mapValues(result, function (v) { return lodash_1.default.orderBy(v, ["no_urut"], ["asc"]); });
                return res.json((0, generator_1.generateSuccess)("", result));
            }).catch(function () {
                return res.json((0, generator_1.generateError)("Err"));
            });
        },
        get: function (req, res) {
            var category_id = parseInt(req.params.category_id);
            (0, database_1.default)("candidates").select("candidates.id", "candidates.full_name", "candidates.kelas", "candidates.candidate_profile_picture", "candidates.visi", "candidates.misi").where("candidates.category_id", "=", category_id).orderBy("candidates.no_urut").then(function (data) {
                return res.json((0, generator_1.generateSuccess)("okelah", data));
            }).catch(function () {
                return res.send((0, generator_1.generateError)("Unexpected Error"));
            });
        },
        result: function (req, res) {
            var _this = this;
            var category_id = req.params.category_id;
            (0, database_1.default)("votes").select("votes.id", "votes.candidate_id", "votes.category_id", "votes.user_id")
                .select(database_1.default.raw("COUNT(*) as total_suara")).groupBy("votes.candidate_id").where("category_id", category_id).then(function (data) { return __awaiter(_this, void 0, void 0, function () {
                var dataSuaraMasuk, i, element, _a, _b, _loop_1, i, result;
                return __generator(this, function (_c) {
                    switch (_c.label) {
                        case 0:
                            dataSuaraMasuk = 0;
                            for (i = 0; i < data.length; i++) {
                                element = data[i];
                                dataSuaraMasuk = dataSuaraMasuk + element.total_suara;
                            }
                            if (!!lodash_1.default.has(dataCache, "users")) return [3 /*break*/, 3];
                            _a = dataCache;
                            return [4 /*yield*/, (0, database_1.default)("users").select(database_1.default.raw("count(*) as total_pemilih")).where("role", "voter")];
                        case 1:
                            _a.users = _c.sent();
                            _b = dataCache;
                            return [4 /*yield*/, (0, database_1.default)("candidates")];
                        case 2:
                            _b.candidates = _c.sent();
                            console.log("hey hey hey");
                            _c.label = 3;
                        case 3:
                            _loop_1 = function (i) {
                                var index = dataCache.candidates.findIndex(function (v) { return v.id == data[i].candidate_id; });
                                var total_suara = data[i].total_suara;
                                data[i] = dataCache.candidates[index];
                                data[i].total_suara = total_suara;
                                data[i].presentase = Math.round((total_suara / dataSuaraMasuk) * 100);
                            };
                            for (i = 0; i < data.length; i++) {
                                _loop_1(i);
                            }
                            result = {
                                data: data,
                                suara_masuk: dataSuaraMasuk,
                                total_pemilih: dataCache.users[0].total_pemilih
                            };
                            return [2 /*return*/, res.json((0, generator_1.generateSuccess)("nyoh", result))];
                    }
                });
            }); }).catch(function (err) {
                console.log(err);
            });
        }
    };
}
exports.default = CategoryController();

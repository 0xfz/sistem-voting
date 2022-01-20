"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var joi_1 = __importDefault(require("joi"));
var lodash_1 = __importDefault(require("lodash"));
var generator_1 = require("../../core/generator");
var database_1 = __importDefault(require("../../database"));
var file_type_1 = require("file-type");
var crypto_1 = require("crypto");
var config_1 = __importDefault(require("../../config"));
function CandidateController() {
    var candidates = database_1.default.table("candidates");
    return {
        upload: function (req, res) {
            var _a;
            var file = (_a = req.files) === null || _a === void 0 ? void 0 : _a.image;
            var candidate = candidates.where("id", "=", req.params.candidate_id);
            if (!file) {
                return res.json((0, generator_1.generateError)("Gambar gagal diupload"));
            }
            (0, file_type_1.fromBuffer)(file.data).then(function (data) {
                if ((data === null || data === void 0 ? void 0 : data.mime.split("/")[0]) != "image") {
                    return res.json((0, generator_1.generateError)("bukan gambar"));
                }
                var filename = (0, crypto_1.randomBytes)(6).toString("base64") + "." + data.ext;
                return file === null || file === void 0 ? void 0 : file.mv("./dist/public/images/" + filename, function (err) {
                    if (err)
                        return res.json((0, generator_1.generateError)("gambar gagal diupload"));
                    var uploadedUrl = config_1.default.baseUrl + "/images/" + filename;
                    candidate.update({ candidate_profile_picture: uploadedUrl }).then(function () {
                        return res.json((0, generator_1.generateSuccess)("gambar sukses diupload"));
                    }).catch(function () {
                        return res.json((0, generator_1.generateError)("gambar gagal diupload"));
                    });
                });
            });
        },
        update: function (req, res) {
            if (req.body.length < 1) {
                return res.json((0, generator_1.generateError)("plz fill the field"));
            }
            candidates.update(req.body).where("id", "=", req.params.candidate_id).then(function () {
                return res.json((0, generator_1.generateSuccess)("Data successfully updated"));
            }).catch(function () {
                return res.json((0, generator_1.generateSuccess)("Err"));
            });
        },
        add: function (req, res) {
            var schema = joi_1.default.object({
                full_name: joi_1.default.string().required(),
                category_id: joi_1.default.string().required(),
                kelas: joi_1.default.string().required(),
                visi: joi_1.default.string().required(),
                misi: joi_1.default.string().required()
            });
            var isValid = schema.validate(req.body);
            if (lodash_1.default.has(isValid, "error")) {
                return res.json((0, generator_1.generateError)("Error check your input"));
            }
            candidates.insert({
                full_name: req.body.full_name,
                visi: req.body.visi,
                misi: req.body.misi,
                category: req.body.category_id,
                class: req.body.kelas
            }).then(function (rows) {
                return res.json((0, generator_1.generateSuccess)("Candidate Created", rows[0]));
            }).catch(function (err) {
                return res.json((0, generator_1.generateError)("Unexpected error"));
            });
        }
    };
}
exports.default = CandidateController;

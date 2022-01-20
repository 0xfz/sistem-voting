"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.compare = exports.sha256 = void 0;
var crypto_1 = __importDefault(require("crypto"));
function sha256(msg) {
    var hash = crypto_1.default.createHash("sha256");
    hash.update(msg);
    return hash.digest("hex");
}
exports.sha256 = sha256;
function compare(hash1, hash2) {
    var hash1Buffer = Buffer.from(hash1, "hex");
    var hash2Buffer = Buffer.from(hash2, "hex");
    return crypto_1.default.timingSafeEqual(hash1Buffer, hash2Buffer);
}
exports.compare = compare;

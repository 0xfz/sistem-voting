"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.generateSuccess = exports.generateError = void 0;
var generateError = function (errorMsg) {
    return {
        status: "error",
        errorMsg: errorMsg
    };
};
exports.generateError = generateError;
var generateSuccess = function (msg, data) {
    if (data === void 0) { data = []; }
    return {
        status: "ok",
        data: data,
        msg: msg
    };
};
exports.generateSuccess = generateSuccess;

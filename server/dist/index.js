"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var express_1 = __importDefault(require("express"));
var express_fileupload_1 = __importDefault(require("express-fileupload"));
var cors_1 = __importDefault(require("cors"));
var api_1 = __importDefault(require("./app/routes/api"));
var body_parser_1 = __importDefault(require("body-parser"));
var database_1 = __importDefault(require("./database"));
var path_1 = __importDefault(require("path"));
var connect_history_api_fallback_1 = __importDefault(require("connect-history-api-fallback"));
var app = (0, express_1.default)();
app.use((0, express_fileupload_1.default)());
app.use((0, cors_1.default)());
app.use((0, body_parser_1.default)());
app.use("/api", api_1.default);
app.use(express_1.default.static(path_1.default.join(__dirname, 'public')));
app.use((0, connect_history_api_fallback_1.default)({
    index: "/index.html"
}));
app.use(express_1.default.static(path_1.default.join(__dirname, 'public')));
app.listen(3000, function () {
    (0, database_1.default)();
    console.log("sukses");
});

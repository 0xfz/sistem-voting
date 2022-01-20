import express from "express";
import fileUpload from 'express-fileupload'
import config from "./config";
import cors from 'cors';
import api from "./app/routes/api";
import bodyParser from "body-parser";
import database from "./database";
import path from "path";
import historyApiFallback from "connect-history-api-fallback";
const app = express()
app.use(fileUpload())
app.use(cors())
app.use(bodyParser())
app.use("/api", api);
app.use(express.static(path.join(__dirname, 'public')));
app.use(historyApiFallback({
    index: "/index.html"
}))
app.use(express.static(path.join(__dirname, 'public')));
app.listen(3000, () => {
    database()
    console.log("sukses")
})
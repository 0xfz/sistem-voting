import { Router } from "express";
import AuthController from "../controllers/AuthController";
import CategoryController from "../controllers/CategoryController";
import VoteController from "../controllers/VoteController";
import VotersController from "../controllers/VotersController";
import { allowedRole, authenticated } from "../middlewares";

const api = Router()
api.post("/login", AuthController.login)
api.post("/vote", authenticated, allowedRole("voter"), VoteController.vote)
api.get("/kategori/:category_id/hasil", [authenticated, allowedRole("admin")], CategoryController.result )
api.post("/voter/addBulk", authenticated, allowedRole("admin"), VotersController.addBulk)
api.get("/kategori", CategoryController.all)
api.get("/kategori/candidates", CategoryController.getAllCandidates)
api.get("/info", VoteController.info)

export default api
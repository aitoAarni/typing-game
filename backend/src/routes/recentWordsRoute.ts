import express, { NextFunction } from "express"
import { tokenHandler } from "../middleware"
import { getRecentWordsController } from "../controllers/recentWordsController"



const recentWordsRouter = express.Router()

recentWordsRouter.get("/:start/:end", tokenHandler, getRecentWordsController)

export default recentWordsRouter

import express from "express"
import {
    getLeitnerDefinition,
    getWordDefinition,
} from "../controllers/textControllers"
import { tokenHandler } from "../middleware"
const textRouter = express.Router()

textRouter.get("/word-definition/random", tokenHandler, getLeitnerDefinition)

textRouter.get("/word-definition/:id", getWordDefinition)



export default textRouter

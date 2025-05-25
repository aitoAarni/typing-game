import express from "express"
import { getWordDefinition } from "../controllers/textControllers"
const textRouter = express.Router()


textRouter.get("/word-definition/:id", getWordDefinition)

export default textRouter
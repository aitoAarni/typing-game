import express, {Request, Response} from "express"
import { getWordDefinition } from "../controllers/textControllers"
const textRouter = express.Router()


textRouter.get("/wordDefinition/:id", getWordDefinition)

export default textRouter
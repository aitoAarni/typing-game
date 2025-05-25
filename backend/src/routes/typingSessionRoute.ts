import express from "express"
import { setTypingSession } from "../controllers/typingSessionController"
import { tokenHandler } from "../middleware"

const typingSessionRouter = express.Router()

typingSessionRouter.post("/", tokenHandler, setTypingSession)

export default typingSessionRouter

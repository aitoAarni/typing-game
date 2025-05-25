import express from "express"
import { setTypingSession } from "../controllers/typingSessionController"

const typingSessionRouter = express.Router()

typingSessionRouter.post("/", setTypingSession)

export default typingSessionRouter

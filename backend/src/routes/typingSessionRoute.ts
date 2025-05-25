import express from "express"
import { getTypingSessions, setTypingSession } from "../controllers/typingSessionController"
import { tokenHandler } from "../middleware"

const typingSessionRouter = express.Router()

typingSessionRouter.post("/", tokenHandler, setTypingSession)

typingSessionRouter.get("/", tokenHandler, getTypingSessions)



export default typingSessionRouter

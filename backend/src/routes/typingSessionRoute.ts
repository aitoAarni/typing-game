import express from "express"
import {
    getTypingSessions,
    getTypingSessionsActivity,
    setTypingSession,
} from "../controllers/typingSessionController"
import { tokenHandler } from "../middleware"

const typingSessionRouter = express.Router()

typingSessionRouter.post("/", tokenHandler, setTypingSession)

typingSessionRouter.get("/", tokenHandler, getTypingSessions)

typingSessionRouter.get("/activity", tokenHandler, getTypingSessionsActivity)

export default typingSessionRouter

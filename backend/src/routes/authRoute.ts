import express from "express"
import { authGoogle } from "../controllers/authControllers"

const authRouter = express.Router()

authRouter.post("/google", authGoogle)

export default authRouter
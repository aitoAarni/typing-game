import express, { Request, Response } from "express"
import cors from "cors"
import textRouter from "./routes/textRoute"
import authRouter from "./routes/authRoute"
import { errorHandler } from "./middleware"
import typingSessionRouter from "./routes/typingSessionRoute"
import recentWordsRouter from "./routes/recentWordsRoute"
const app = express()
const PORT = process.env.PORT ? process.env.PORT : 3000

app.use(cors())
app.use(express.json())

app.get("/", (req: Request, res: Response) => {
    res.send("Hello World!")
})

app.get("/health", (req: Request, res: Response) => {
    console.log("request received")
    res.status(200).json({ message: "Server is healthy" })
})

app.use("/text", textRouter)

app.use("/auth", authRouter)

app.use("/typing-session", typingSessionRouter)

app.use("/recent-words", recentWordsRouter)

app.use(errorHandler)

app.listen(PORT, () => {
    console.log("Backend listening on PORT " + PORT)
})

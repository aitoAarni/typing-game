import express, { Request, Response } from "express"
import cors from "cors"
import textRouter from "./routes/textRoute"
import authRouter from "./routes/authRoute"
import { errorHandler } from "./middleware"
const app = express()
const PORT = 3000

app.use(cors())
app.use(express.json())

app.get("/", (req: Request, res: Response) => {
    res.send("Hello World!")
})

app.use("/api/text", textRouter)

app.use("/api/auth", authRouter)

app.use(errorHandler)

app.listen(PORT, () => {
    console.log("Backend listening on PORT " + PORT)
})

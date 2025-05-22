import express, { Request, Response } from "express"
import cors from "cors"
import textRouter from "./routes/textRoute"
import authRouter from "./routes/authRoute"
const app = express()
const PORT = 3000

app.use(cors())

app.get("/", (req: Request, res: Response) => {
    res.send("Hello World!")
})

app.use("/text", textRouter)

app.use("/auth", authRouter)

app.listen(PORT, () => {
    console.log("Backend listening on PORT " + PORT)
})

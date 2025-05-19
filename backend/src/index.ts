import express, { Request, Response } from "express"
import textRouter from "./routes/textRoutes"
const app = express()
const PORT = 3000

app.get("/", (req: Request, res: Response) => {
    res.send("Hello World!")
})

app.use("/text", textRouter)

app.listen(PORT, () => {
    console.log("Backend listening on PORT " + PORT)
})

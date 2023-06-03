import express from "express"
import mongoose from "mongoose"
import dotenv from 'dotenv'

dotenv.config()
const { PORT, URI } = process.env
const app = express()

import authorRouter from "./routes/AuthorRouter.js"
import blogRouter from "./routes/BlogRouter.js"



app.use(express.json())
app.use(express.urlencoded({extended: true}))

app.use('/', authorRouter)
app.use('/', blogRouter)

try {

    app.listen(PORT, () => {
        console.log("Server start on PORT: ", PORT)
    })

    mongoose.connect(URI)
    console.log("MongoDB is Connected...")

} catch (error) {
    console.log("Internal error from index.js", error)
}
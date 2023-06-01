import express from "express"
import { createBlog } from "../controllers/BlogController.js"

 const router = express.Router()

router.get('/test1', (req,res) => {
    res.send({status: true, message: "Blog Router"})
})

router.post('/blog', createBlog)

export default router;
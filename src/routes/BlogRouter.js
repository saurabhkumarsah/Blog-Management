import express from "express"
import { createBlog, getBlog, updateBlog } from "../controllers/BlogController.js"

 const router = express.Router()

router.get('/test1', (req,res) => {
    res.send({status: true, message: "Blog Router"})
})

router.post('/blog', createBlog)
router.get('/blog', getBlog)
router.put('/blog/:blogId', updateBlog)

export default router;
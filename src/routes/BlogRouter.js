import express from "express"
import { blogDeleteByCondition, createBlog, deleteBlogById, getBlog, updateBlog } from "../controllers/BlogController.js"
import { authCreate, authDeleteBlogById, authDeleteBlogByQuery, authEditBlog, authGetList } from "../middlewares/authorization.js"

const router = express.Router()

router.get('/test1', (req, res) => {
    res.send({ status: true, message: "Blog Router" })
})

router.post('/blogs', authCreate, createBlog)
router.get('/blogs', authGetList, getBlog)
router.put('/blogs/:blogId', authEditBlog, updateBlog)
router.delete('/blogs/:blogId', authDeleteBlogById, deleteBlogById)
router.delete('/blogs', authDeleteBlogByQuery, blogDeleteByCondition)

export default router;
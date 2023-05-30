import express from 'express'
import { createAuthor } from '../controllers/authorController.js'

const router = express.Router()

router.get('/test', (req,res) => {
    res.send({status: true, message: "👍"})
})

router.post('/author', createAuthor)

export default router;
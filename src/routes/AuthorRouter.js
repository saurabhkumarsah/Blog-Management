import express from 'express'
import { authorLogin, createAuthor } from '../controllers/authorController.js'

const router = express.Router()

router.get('/test', (req,res) => {
    res.send({status: true, message: "👍"})
})

router.post('/author', createAuthor)

router.post('/login', authorLogin)

export default router;
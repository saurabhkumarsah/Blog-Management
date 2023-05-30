import express from "express"

 const router = express.Router()

router.get('/test1', (req,res) => {
    res.send({status: true, message: "Blog Router"})
})

export default router;
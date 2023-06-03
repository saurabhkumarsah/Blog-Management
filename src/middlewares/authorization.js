import jwt from 'jsonwebtoken'
import BlogModel from '../models/BlogModel.js'

export const authCreate = async (req, res, next) => {
    try {
        const { JWT_SECRET } = process.env
        const token = req.headers['x-api-key']
        if (!token) return res.status(401).send({ status: false, messsage: "Please, Provide token" })
        const decoded = jwt.verify(token, JWT_SECRET)
        let authorId = req.body.authorId.trim()
        if (decoded._id === authorId) {
            return next()
        } else {
            return res.status(401).send({ status: false, messsage: "You have not permission to create Blog of other Author" })
        }
    } catch (error) {
        return res.status(500).send({ status: false, messsage: error.message })
    }
}


export const authGetList = (req, res, next) => {
    try {
        const { JWT_SECRET } = process.env
        const token = req.headers['x-api-key']
        if(!token) return res.status(401).send({ status: false, messsage: "Please, Provide token" })
        const decoded = jwt.verify(token, JWT_SECRET)
        req.headers['author-Id'] = decoded._id
        return next()
    } catch (error) {
        return res.status(500).send({ status: false, messsage: error.message })
    }
}


export const authEditBlog = async (req, res, next) => {
    try {
        const blogId = req.params.blogId
        if (blogId.length !== 24 || blogId == undefined) return res.status(404).send({ status: false, message: "Blog ID is not valid" })
        const { JWT_SECRET } = process.env
        const token = req.headers['x-api-key']
        if (!token) return res.status(401).send({ status: false, messsage: "Please, Provide token" })
        const decoded = jwt.verify(token, JWT_SECRET)
        const data = await BlogModel.findById(blogId)

        if (data.authorId.toString() !== decoded['_id']) return res.status(403).send({ status: false, messsage: "You have not permission to update the blog of other author" })
        return next()
    } catch (error) {
        console.log("authEdit");
        return res.status(500).send({ status: false, messsage: error.message })
    }
}

export const authDeleteBlogById = async (req, res, next) => {
    try {
        const blogId = req.params.blogId.trim()
        if (blogId.length !== 24 || blogId == undefined) return res.status(404).send({ status: false, message: "Blog ID is not valid" })
        const { JWT_SECRET } = process.env
        const token = req.headers['x-api-key']
        if (!token) return res.status(401).send({ status: false, messsage: "Please, Provide token" })
        const decoded = jwt.verify(token, JWT_SECRET)
        const data = await BlogModel.findById( blogId )
        if (data.authorId.toString() !== decoded._id) return res.status(403).send({ status: false, messsage: "You have not permission to update the blog of other author" })
        return next()
    } catch (error) {
        return res.status(500).send({ status: false, messsage: error.message })
    }
}

export const authDeleteBlogByQuery = async (req, res, next) => {
    try {
        const { JWT_SECRET } = process.env
        const token = req.headers['x-api-key']
        if (!token) return res.status(401).send({ status: false, messsage: "Please, Provide token" })
        const decoded = jwt.verify(token, JWT_SECRET)
        req.headers['author-Id'] = decoded._id
        return next()
    } catch (error) {
        console.log("aut");
        return res.status(500).send({ status: false, messsage: error.message })
    }
}

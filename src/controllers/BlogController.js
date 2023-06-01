import moment from 'moment'
import authorModel from '../models/AuthorModel.js'
import blogModel from '../models/BlogModel.js'


//  * -------------------------------------------------------------------------------------------------------------------------*
//  *                                              Create Blog Function Start                                                  *
//  * -------------------------------------------------------------------------------------------------------------------------*

export const createBlog = async (req, res) => {
    try {

        let data = req.body
        data.title = data.title.trim()
        data.body = data.body.trim()
        data.authorId = data.authorId.trim()
        data.category = data.category.trim()
        let { title, body, authorId, category, isPublished, isDeleted } = data

        if (!title) return res.status(400).send({ status: false, message: "Please, Provide  title" })
        if (!body) return res.status(400).send({ status: false, message: "Please, Provide  body" })
        if (!authorId) return res.status(400).send({ status: false, message: "Please, Provide  Author ID" })

        if (authorId.length !== 24) return res.status(400).send({ status: false, message: "Please, Provide valid Author ID" })
        const dbAuthorId = await authorModel.findById(authorId)

        if (!dbAuthorId) return res.status(400).send({ status: false, message: "Author ID is not exist" })

        if (!category) return res.status(400).send({ status: false, message: "Please, Provide  Category" })

        if (isPublished) {
            data.publishedAt = moment().format()
        } else {
            delete data.publishedAt
        }

        if (isDeleted) { data.isDeleted = false }

        const saveData = await blogModel.create(data)
        res.status(201).send({ status: true, data: saveData })

    } catch (error) {

        console.log("Error from BlogController.js");
        res.status(500).send({ status: false, message: error.message })

    }
}

//  * -------------------------------------------------------------------------------------------------------------------------*
//  *                                              Create Blog Function End                                                    *
//  * -------------------------------------------------------------------------------------------------------------------------*



//  * -------------------------------------------------------------------------------------------------------------------------*
//  *                                               Get Blog Function Start                                                    *
//  * -------------------------------------------------------------------------------------------------------------------------*

export const getBlog = async (req, res) => {
    try {

        const filter = req.query

        const data = await blogModel.find({$and: [filter,{ isPublished: true, isDeleted: false }]})
        if (data.length === 0) return res.status(404).send({ status: false, message: "Blog not found" })
        res.status(200).send({ status: true, data: data })
    } catch (error) {
        res.status(500).send({ status: false, message: error.message })
    }
}

//  * -------------------------------------------------------------------------------------------------------------------------*
//  *                                               Get Blog Function End                                                      *
//  * -------------------------------------------------------------------------------------------------------------------------*

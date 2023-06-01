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

export const getBlog = async (req,res) => {
    const data = await blogModel.find({isPublished: true, isDeleted: false})
    res.status(200).send({status: true, data: data})
}

//  * -------------------------------------------------------------------------------------------------------------------------*
//  *                                               Get Blog Function End                                                      *
//  * -------------------------------------------------------------------------------------------------------------------------*


// GET / blogs
// Returns all blogs in the collection that aren't deleted and are published
// Return the HTTP status 200 if any documents are found.The response structure should be like this
// If no documents are found then return an HTTP status 404 with a response like this
// Filter blogs list by applying filters.Query param can have any combination of below filters.
// By author Id
// By category
// List of blogs that have a specific tag
// List of blogs that have a specific subcategory example of a query url: blogs ? filtername = filtervalue & f2=fv2
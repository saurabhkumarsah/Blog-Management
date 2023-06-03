import authorModel from '../models/AuthorModel.js'
import isValidEmail from 'email-validator'
import jwt from 'jsonwebtoken'
const lower = (str) => {
    return str.toLowerCase()
}
const removeSpaces = (str) => {
    return str.trim()
}

//  * -------------------------------------------------------------------------------------------------------------------------*
//  *                                              Create Author Function Start                                                *
//  * -------------------------------------------------------------------------------------------------------------------------*

export const createAuthor = async (req, res) => {
    try {

        const data = req.body
        // data.email = lower(data.email)
        // data.fname = removeSpaces(data.fname)
        // data.lname = removeSpaces(data.lname)
        // data.title = removeSpaces(data.title)
        // data.email = removeSpaces(data.email)
        // data.password = removeSpaces(data.password)

        let { fname, lname, title, email, password } = data

        if (!fname) return res.status(400).send({ status: false, messsage: "Please, Provide first name" })
        if (!lname) return res.status(400).send({ status: false, messsage: "Please, Provide last name" })
        if (!title) return res.status(400).send({ status: false, messsage: "Please, Provide title" })
        if (title !== "Mr" && title !== "Mrs" && title !== "Miss") return res.status(400).send({ status: false, messsage: "Please, Provide title only one of these: [Mr, Mrs, Miss] " })

        if (!email) return res.status(400).send({ status: false, messsage: "Please, Provide email Id" })
        if (!isValidEmail.validate(email)) return res.status(400).send({ status: false, messsage: "Please, Provide valid email Id" })

        const emailId = await authorModel.findOne({ email: email })
        // console.log(emailId);
        if (emailId) return res.status(400).send({ status: false, messsage: "Email Id is already exits" })

        if (!password) return res.status(400).send({ status: false, messsage: "Please, Provide password" })
        const saveData = await authorModel.create(data)
        return res.status(201).send({ status: true, data: saveData })

    } catch (error) {

        // console.log("Error from authorController/createAuthor", error.message)
        return res.status(500).send({ status: false, messsage: error.message })

    }
}
//  * -------------------------------------------------------------------------------------------------------------------------*
//  *                                              Create Author Function End                                                  *
//  * -------------------------------------------------------------------------------------------------------------------------*


//  * -------------------------------------------------------------------------------------------------------------------------*
//  *                                              Author Login Function Start                                                 *
//  * -------------------------------------------------------------------------------------------------------------------------*

export const authorLogin = async (req, res) => {
    try {

        const { JWT_SECRET } = process.env
        // req.body.email = removeSpaces(req.body.email)
        // req.body.password = removeSpaces(req.body.password)

        let { email, password } = req.body

        if (!email) return res.status(400).send({ status: false, messsage: "Please, Provide email Id" })
        if (!isValidEmail.validate(email)) return res.status(400).send({ status: false, messsage: "Please, Provide valid email Id" })
        if (!password) return res.status(400).send({ status: false, messsage: "Please, Provide Password" })

        const data = await authorModel.findOne(req.body)
        if (!data) return res.status(401).send({ status: false, messsage: "Credentials are not matched" })

        const dataId = data._id.toString()
        const token = jwt.sign({ _id: dataId }, JWT_SECRET)

        return res.status(201).send({ status: true, data: { token: token } })

    } catch (error) {
        return res.status(500).send({ status: false, messsage: error.message })
    }
}

//  * -------------------------------------------------------------------------------------------------------------------------*
//  *                                              Author Login Function End                                                   *
//  * -------------------------------------------------------------------------------------------------------------------------*

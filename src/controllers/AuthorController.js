import authorModel from '../models/AuthorModel.js'
import isValidEmail from 'email-validator'
const lower = (str) => {
 return str.toLowerCase()
}

export const createAuthor = async (req, res) => {
    try {

        const data = req.body
        data.email = lower(data.email)
        let { fname, lname, title, email, password } = data
        if (!fname) return res.status(400).send({ status: false, messsage: "Please, Provide first name" })
        if (!lname) return res.status(400).send({ status: false, messsage: "Please, Provide last name" })
        if (!title) return res.status(400).send({ status: false, messsage: "Please, Provide title" })
        if (title !== "Mr" && title !== "Mrs" && title !== "Miss") return res.status(400).send({ status: false, messsage: "Please, Provide title only one of these: [Mr, Mrs, Miss] " })

        if (!email) return res.status(400).send({ status: false, messsage: "Please, Provide email Id" })
        if (!isValidEmail.validate(email)) return res.status(400).send({ status: false, messsage: "Please, Provide valid email Id" })
        
        const emailId = await authorModel.find({ email: email })
        // console.log(emailId);
        if (emailId.length === 1) return res.status(400).send({ status: false, messsage: "Email Id is already exits" })

        if (!password) return res.status(400).send({ status: false, messsage: "Please, Provide password" })
        const saveData = await authorModel.create(data)
        res.status(201).send({ status: true, data: saveData })

    } catch (error) {

        console.log("Error from authorController/createAuthor", error.message)
        res.status(500).send({ status: false, messsage: error.message })

    }
}




//     Author APIs /authors
// Create an author - atleast 5 authors
// Create a author document from request body.Endpoint: BASE_URL / authors
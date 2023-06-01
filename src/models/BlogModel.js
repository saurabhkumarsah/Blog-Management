import mongoose from "mongoose"
const { Schema, model } = mongoose
const ObjectId = mongoose.Schema.Types.ObjectId

const blogSchema = new Schema(
    {
        title: {
            type: String,
            require: true
        },
        body: {
            type: String,
            require: true
        },
        authorId: {
            type: ObjectId,
            ref: "AuthorModel",
            require: true
        },
        tags: ["String"],
        category: {
            type: String,
            require: true
        },
        subcategory: ["String"],
        isPublished: {
            type: Boolean,
            default: false
        },
        isDeleted: {
            type: Boolean,
            default: false
        },
        publishedAt: Date,
        deletedAt: Date
    },
    { timestamps: true }
)

export default model("Blog", blogSchema)

// { title: { mandatory }, body: { mandatory }, authorId: { mandatory, refs to author model }, tags: {array of string }, category: { string, mandatory }, subcategory: {array of string, examples[technology - [web development, mobile development, AI, ML etc]] }, createdAt, updatedAt, deletedAt: {when the document is deleted }, isDeleted: { boolean, default: false }, publishedAt: {when the blog is published }, isPublished: { boolean, default: false } }
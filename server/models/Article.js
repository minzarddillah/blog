const mongoose = require('mongoose')
const Schema = mongoose.Schema

const articleSchema = new Schema({
    title: String,
    description: String,
    author: { type: Schema.Types.ObjectId, ref: 'User'},
    comment: [{ type: Schema.Types.ObjectId, ref: 'Comment'}]
})

const Article = mongoose.model('Article', articleSchema)

module.exports = Article
const mongoose = require('mongoose')
const Schema = mongoose.Schema

const commentSchema = new Schema({
    userId: {
        type: Schema.Types.ObjectId,
        ref: 'User'
    },
    articleId: {
        type: Schema.Types.ObjectId,
        ref: 'Article'
    },
    content: {
        type: String,
        required: [true, 'Kolom komentar harus di isi']
    }
})

const Comment = mongoose.model('Comment', commentSchema)

module.exports = Comment
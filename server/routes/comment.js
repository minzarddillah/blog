const router = require('express').Router()
const ObjectId = require('mongoose').Types.ObjectId
const { authen, authorComment } = require('../helpers/auth')
const Comments = require('../models/Comment')
const { verify } = require('../helpers/jwt')

router.post('/', authen, function(req, res){
    let token = req.headers.token

    verify(token)
        .then(decoded => {
            return Comments.create({
                userId: ObjectId(decoded._id),
                articleId: ObjectId(req.body.articleId),
                content: req.body.content
            })
        })
        .then(newComment =>{
            res.status(200).json({
                message: 'Berhasil menambah komenter',
                data: newComment
            })
        })
        .catch(err => {
            res.status(500).json(err)
        })
})

router.put('/', authen, authorComment, function(req,res){
    Comments
        .findByIdAndUpdate(ObjectId(req.body.commentId), {
            content: req.body.content
        })
        .then(response => {
            res.status(200).json({
                message: 'Berhasil Edit Comment'
            })
        })
        .catch(err => {
            res.status(500).json(err)
        })
})

router.delete('/', authen, authorComment, function(req, res) {
    // console.log(`masuk`)
    Comments
        .findByIdAndRemove(ObjectId(req.body.commentId))
        .then(response => {
            res.status(200).json({
                message: 'Berhasil Hapus Komentar'
            })
        })
        .catch(err => {
            res.status(500).json(err)
        })
})


module.exports = router
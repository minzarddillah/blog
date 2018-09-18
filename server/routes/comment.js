const router = require('express').Router()
const ObjectId = require('mongoose').Types.ObjectId
const { authen, } = require('../helpers/auth')
const Comments = require('../models/Comment')

router.post('/', authen, function(req, res){
    Comments
        .create({
            userId: ObjectId(req.body.userId),
            articleId: ObjectId(req.body.articleId),
            content: req.body.content
        })
        .then(newComment =>{
            res.status(200).json({
                message: 'Berhasil menambah komenter'
            })
        })
        .catch(err =>{
            res.status(500).json(err)
        })
})

router.put('/', authen, function(req,res){

})


module.exports = router
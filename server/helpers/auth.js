const ObjectId = require('mongoose').Types.ObjectId
const { verify } = require('./jwt')
const User = require('../models/User')
const Article = require('../models/Article')
module.exports = {
    authen: function(req,res,next){
        verify(req.headers.token)
            .then(decoded =>{
                // console.log(decoded)
                return User.findOne({
                    _id: ObjectId(decoded._id),
                    email: decoded.email
                })
            })
            .then(user =>{
                if(user){
                    next()
                }else{
                    res.status(401).json({
                        message: 'INVALID TOKEN'
                    })
                }
            })
    },
    authorArticle: function(req,res,next){
        verify(req.headers.token)
            .then(decoded =>{
                return Article.findOne({
                    _id: ObjectId(req.body.articleId),
                    author: ObjectId(decoded._id)
                })
            })
            .then(article =>{
                if(article){
                    next()
                }else{
                    res.status(401).json({
                        message: 'Tidak Ada Akses Untuk Delete Article'
                    })
                }
            })
            .catch(err =>{
                res.status(500).json(err)
            })
    }
}
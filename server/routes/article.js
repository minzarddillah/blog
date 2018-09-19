const router = require('express').Router()
const ObjectId = require('mongoose').Types.ObjectId
const Article = require('../models/Article')
const User = require('../models/User')
const Comments = require('../models/Comment')
const { verify } = require('../helpers/jwt')
const { authen, authorArticle } = require('../helpers/auth')
// authen author

router.post('/', authen, function (req, res) {
    let userId 
    let newArticle
    verify(req.headers.token)
    .then(decoded =>{
        userId = decoded._id
        let newArticle = new Article({
            title: req.body.title,
            content: req.body.content,
            author: ObjectId(userId)
        })
        return newArticle.save()
        })
        .then(article =>{
            newArticle = article
            return User.findById(ObjectId(userId))
        })
        .then(user =>{
            user.articles.push(ObjectId(newArticle._id))
            return user.save()
        })
        .then(newUser =>{
            res.status(200).json({
                message: 'Success Create Article',
                data: newArticle
            })
            
        })
        .catch(err =>{
            res.status(500).json(err)
        })
})

router.get('/', function(req, res){
    Article    
        .find().populate('author')
        .then(articles => {
            res.status(200).json(articles)
        })
        .catch(err => {
            res.status(500).json(err)
        })
})

router.put('/', authen, authorArticle, function(req, res) {
    let update = {}
    let keys = Object.keys(req.body)
    let values = Object.values(req.body)
    
    for(let i = 0 ; i < keys.length ; i++){
        if(keys[i] !== "articleId"){
            update[keys[i]] = values[i]
        }
    }
    Article
        .findByIdAndUpdate(ObjectId(req.body.articleId), update)
        .then(response =>{
            res.status(200).json({
                message: 'Success Update Article'
            })
        })
        .catch(err =>{
            res.status(500).json(err)
        })
})

router.delete('/', authen, authorArticle, function(req,res){
    // console.log(`MASUK KE DELETE`)
    Article
        .findByIdAndRemove(ObjectId(req.body.articleId))
        .then(response =>{
            res.status(200).json({
                message: 'Berhasil Delete Article'
            })
        })
        .catch(err =>{
            res.status(500).json(err)
        })
})

router.get('/my-articles', authen, function(req, res) {
    // console.log(`masok`)
    verify(req.headers.token)
        .then(decoded => {
            // console.log(decoded)
            return Article.find({ author: ObjectId(decoded._id) }).populate('author')
        })
        .then(articles => {
            res.status(200).json(articles)
        })
        .catch(err => {
            res.status(500).json(err)
        })
})

router.get('/:id', function(req, res){
    let articleUser
    Article
        .findById(ObjectId(req.params.id)).populate('author').populate('comment').populate('userId')
        .then(article => {
            articleUser = article
            if(article){
                // res.status(200).json(article)
                return Comments.find({ articleId: ObjectId(req.params.id) }).populate('userId')
            }else{
                res.status(404).json({
                    message: 'Article Not Found'
                })
            }
        })
        .then(comments => {
            articleUser.comment = comments
            res.status(200).json(articleUser)
        })
        .catch(err => {
            res.status(500).json(err)
        })
})

module.exports = router
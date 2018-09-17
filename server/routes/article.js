const router = require('express').Router()
const ObjectId = require('mongoose').Types.ObjectId
const Article = require('../models/Article')
const User = require('../models/User')
const { verify } = require('../helpers/jwt')
const { authen } = require('../helpers/auth')
// authen author

router.post('/', authen, function (req, res) {
    let userId 
    let newArticle = new Article({
        title: req.body.title,
        description: req.body.description,
        user: userId
    })
    verify(req.headers.token)
        .then(decoded =>{
            userId = decoded._id
            return newArticle.save()
        })
        .then(article =>{
            return User.findById(ObjectId(userId))
        })
        .then(user =>{
            user.articles.push(ObjectId(newArticle._id))
            return user.save()
            // console.log(user)
        })
        .then(newUser =>{

        })
})


module.exports = router
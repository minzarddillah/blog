const router = require('express').Router()
const article = require('./article')
const comment = require('./comment')
const User = require('../models/User')
const { decrypt } = require('../helpers/hash')
const { sign } = require('../helpers/jwt')


router.post('/signup', function (req, res) {
    let newUser = new User({
        name: req.body.name,
        email: req.body.email,
        password: req.body.password
    })
    newUser
        .save()
        .then(newUserDb => {
            res.status(200).json({
                message: 'Berhasil Daftar',
                data: newUserDb
            })
        })
        .catch(err => {
            res.status(500).json({
                message: err
            })
        })
})

router.post('/signin', function(req,res){
    let email = req.body.email
    let password = req.body.password
    let dataUser
    User.findOne({email: email})
        .then(user =>{
            dataUser = user
            let hashPassword = user.password
            if(decrypt(password, hashPassword)){
                return sign({
                    _id: user._id,
                    email: user.email
                })
            }else{
                res.status(404).json({
                    message: 'Email atau password salah'
                })
            }
        })
        .then(token =>{
            res.status(200).json({
                token: token,
                name: dataUser.name,
                email: dataUser.email
            })
        })
        .catch(err =>{
            res.status(500).json(err)
        })
})

router.use('/articles', article)

router.use('/comment', comment)

module.exports = router
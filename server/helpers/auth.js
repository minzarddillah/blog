const ObjectId = require('mongoose').Types.ObjectId
const { verify } = require('./jwt')
const User = require('../models/User')
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
    author: function(req,res,next){

    }
}
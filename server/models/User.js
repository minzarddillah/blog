const mongoose = require('mongoose')
const validate = require("email-validator").validate
const { encrypt } = require('../helpers/hash')
const Schema = mongoose.Schema

const userSchema = new Schema({
    name: String,
    email: {
        type: String,
        unique: [true, 'Email Already Exist'],
        required: [true, 'Email harus di isi']
    },
    password: {
        type: String,
        minlength: [6, `Password minimal 6 karakter`],
        required: [true, 'Password harus di isi']
    },
    articles: [{type: Schema.Types.ObjectId, ref: 'Article'}]
})

userSchema.pre('validate', function(next){
    if(!validate(this.email)){
        next(`invalid input email`)
    }else{
        next()
    }
})

userSchema.post('validate', function(user) {
    if(user.password.length <= 30){
        user.password = encrypt(user.password)
    }
});

userSchema.post('save', function(error, doc, next){
    if (error.name === 'MongoError' && error.code === 11000) {
        next('Email Already Exist');
    } else {
        next(error);
    }
})

const User = mongoose.model('User', userSchema)

module.exports = User
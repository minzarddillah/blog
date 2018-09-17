const mongoose = require('mongoose')
const { encrypt } = require('../helpers/hash')
const Schema = mongoose.Schema

const userSchema = new Schema({
    name: String,
    email: {
        type: String,
        unique: [true, 'Email Already Exist']
    },
    password: {
        type: String,
        minlength: [6, `Password minimal 6 karakter`],
    },
    articles: [{type: Schema.Types.ObjectId, ref: 'Article'}]
})

userSchema.pre('validate', function() {
    if(this.password.length < 30){
        this.password = encrypt(this.password)
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
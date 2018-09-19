const router = require('express').Router()
const article = require('./article')
const comment = require('./comment')
const { signin, signup } = require('../controllers/user')


router.post('/signup', signup)

router.post('/signin', signin)

router.use('/articles', article)

router.use('/comment', comment)

module.exports = router
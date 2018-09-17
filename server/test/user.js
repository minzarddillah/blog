process.env.NODE_ENV = 'test'
const app = require('../app')
const chai = require('chai')
const chaiHttp = require('chai-http')
const User = require('../models/User')
const Article = require('../models/Article')
var expect = chai.expect;

chai.use(chaiHttp);

describe('article', function () {
    this.afterAll(function (done) {
        Article
            .remove({})
            .then(res =>{
                return User.findByIdAndUpdate(ObjectId("5b9f63777897216c9219954c"),{ $unset: {articles:1} })
            })
            .then(res =>{
                done()
            })
    })

    it('POST /articles should return new article', function(done){
        chai
            .request(app)
            .post('/articles')
            .set('token', `eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI1YjlmNjM3Nzc4OTcyMTZjOTIxOTk1NGMiLCJlbWFpbCI6ImFkbWluQGJsb2cuY29tIiwiaWF0IjoxNTM3MTcyNjgwfQ.0b2iJw4sjd3RDkaIvWlKmeOsR8MkO3t0AwmeyYNvZG4`)
            .send({
                title: 'TEST ARTICLE',
                description: 'TEST BUAT ARTICLE'
            })
            .end(function (err, res) {
                expect(res).to.have.status(200)
                done()
            })
    })

})


describe('user', function () {
    this.afterAll(function (done) {
        User
            .remove({email: { $ne: 'admin@blog.com'}})
            .then(res =>{
                done()
            })
    })
    // register && login
    it('POST /signup should return new user', function (done) {
        chai
            .request(app)
            .post('/signup')
            .send({
                name: `Minzard`,
                email: `minzard.dillah@gmail.com`,
                password: `123456`
            })
            .end(function (err, res) {
                let newUser = res.body.data
                expect(res).to.have.status(200)
                expect(newUser).to.be.a('object')
                expect(newUser).to.have.property('name')
                expect(newUser).to.have.property('email')
                expect(newUser).to.have.property('password')
                expect(newUser.name).to.equal('Minzard')
                done()
            })
    })

    it(`POST /signin should return token`, function (done) {
        chai
            .request(app)
            .post('/signin')
            .send({
                email: `admin@blog.com`,
                password: `123456`
            })
            .end(function (err, res) {
                let result = res.body
                expect(res).to.have.status(200)
                expect(result).to.have.property('token')
                done()
            })
    })
})
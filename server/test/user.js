process.env.NODE_ENV = 'test'
const ObjectId = require('mongoose').Types.ObjectId
const app = require('../app')
const chai = require('chai')
const chaiHttp = require('chai-http')
const User = require('../models/User')
const Article = require('../models/Article')
var expect = chai.expect;

chai.use(chaiHttp);

describe('article', function () {
    // this.afterAll(function (done) {
    //     Article
    //         .remove({})
    //         .then(res =>{
    //             return User.findByIdAndUpdate(ObjectId("5b9f7199ed78957792190482"),{ $unset: {"articles": []}} )
    //         })
    //         .then(res =>{
    //             done()
    //         })
    // })

    // CREATE ARTICLE
    // it('POST /articles should return new article', function (done) {
    //     chai
    //         .request(app)
    //         .post('/articles')
    //         .set('token', `eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI1YjlmNzE5OWVkNzg5NTc3OTIxOTA0ODIiLCJlbWFpbCI6ImFkbWluQGJsb2cuY29tIiwiaWF0IjoxNTM3MTc1OTYxfQ._Lb2DWSbmQn-mZzYrPgJ4hesjjopyIA-nQbrFyDsRmY`)
    //         .send({
    //             title: 'TEST ARTICLE',
    //             description: 'TEST BUAT ARTICLE'
    //         })
    //         .end(function (err, res) {
    //             let response = res.body
    //             expect(res).to.have.status(200)
    //             expect(response).to.have.property('message')
    //             expect(response.message).to.equal('Success Create Article')
    //             expect(response.data).to.have.property('title')
    //             done()
    //         })
    // })

    // GET ALL ARTICLES
    it('GET /articles should return all artice', function (done) {
        chai
            .request(app)
            .get('/articles')
            .end(function (err, res) {
                let response = res.body
                expect(res).to.have.status(200)
                expect(response).to.be.a('array')
                done()
            })
    })


    // UPDATE ARTICLE
    it('PUT /articles should return new updated article', function (done) {
        chai
            .request(app)
            .put('/articles')
            .set('token', `eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI1YjlmNzE5OWVkNzg5NTc3OTIxOTA0ODIiLCJlbWFpbCI6ImFkbWluQGJsb2cuY29tIiwiaWF0IjoxNTM3MTc1OTYxfQ._Lb2DWSbmQn-mZzYrPgJ4hesjjopyIA-nQbrFyDsRmY`)
            .send({
                articleId: "5b9f7f1374cce202f1a5f5d8",
                title: 'UPDATE JUDUL ARTICLE'
            })
            .end(function (err, res) {
                expect(res).to.have.status(200)
                expect(res.body.message).to.equal('Success Update Article')
                done()
            })
    })

    // DELETE ARTICLE
    // it('/DELETE /articles should return delete article', function (done) {
    //     chai
    //         .request(app)
    //         .del('/articles')
    //         .set('token', `eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI1YjlmNzE5OWVkNzg5NTc3OTIxOTA0ODIiLCJlbWFpbCI6ImFkbWluQGJsb2cuY29tIiwiaWF0IjoxNTM3MTc1OTYxfQ._Lb2DWSbmQn-mZzYrPgJ4hesjjopyIA-nQbrFyDsRmY`)
    //         .send({
    //             articleId: "5b9f7f1374cce202f1a5f5d8"
    //         })
    //         .end(function (err, res){
    //             expect(res).to.have.status(200)
    //             console.log(`MASUK PAK EKO`)
    //             done()
    //         })
    // })
})

describe('user', function () {
    this.afterAll(function (done) {
        User
            .remove({
                email: {
                    $ne: 'admin@blog.com'
                }
            })
            .then(res => {
                done()
            })
    })

    // SIGNUP USER
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

    // SIGNIN USER
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
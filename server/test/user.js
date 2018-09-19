process.env.NODE_ENV = 'test'
const app = require('../app')
const chai = require('chai')
const chaiHttp = require('chai-http')
const User = require('../models/User')
const Comments = require('../models/Comment')
var expect = chai.expect;

chai.use(chaiHttp);

describe('article', function () {
    let token

    this.beforeAll(function (done) {
        chai
            .request(app)
            .post('/signup')
            .send({
                name: `Minzard`,
                email: `minzard.dillah@gmail.com`,
                password: `123456`
            })
            .end(function (err, res) {
                chai
                    .request(app)
                    .post('/signin')
                    .send({
                        email: `minzard.dillah@gmail.com`,
                        password: `123456`
                    })
                    .end(function (err, res) {
                        let result = res.body
                        token = result.token
                        done()
                    });
            });
        
    })

    this.afterAll(function (done) {
        User
            .remove({})
            .then(res =>{
                done()
            })
    })


    // ==================== TEST ARTICLE ====================
    let articleId
    // CREATE ARTICLE
    it('POST /articles should return new article', function (done) {
        chai
            .request(app)
            .post('/articles')
            .set('token', token)
            .send({
                title: 'TEST ARTICLE',
                description: 'TEST BUAT ARTICLE'
            })
            .end(function (err, res) {
                let response = res.body
                articleId = response.data._id
                expect(res).to.have.status(200)
                expect(response).to.have.property('message')
                expect(response.message).to.equal('Success Create Article')
                expect(response.data).to.have.property('title')
                done()
            })
    })

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
            .set('token', token)
            .send({
                articleId: articleId,
                title: 'UPDATE JUDUL ARTICLE'
            })
            .end(function (err, res) {
                expect(res).to.have.status(200)
                expect(res.body.message).to.equal('Success Update Article')
                done()
            })
    })



    // ==================== TEST COMMENT ====================
    let commentId
    // CREATE COMMENT
    it('POST /comment', function (done) {
        chai
            .request(app)
            .post('/comment')
            .set('token', token)
            .send({
                articleId: articleId,
                content: 'INI KOMENTAR'
            })
            .end(function (err, res) {
                let response = res.body
                commentId = response.data._id
                expect(res).to.have.status(200)
                expect(response).to.have.property('message')
                expect(response.message).to.equal('Berhasil menambah komenter')
                done()
            })
    })

    // EDIT COMMENT
    it('PUT /comment should return updated comment', function (done) {
        chai
            .request(app)
            .put('/comment')
            .set('token', token)
            .send({
                commentId: commentId,
                content: 'KOMENTAR YANG UDAH DI UPDATE'
            })
            .end(function (err, res) {
                expect(res).to.have.status(200)
                expect(res.body.message).to.equal('Berhasil Edit Comment')
                done()
            })
    })




    // ==================== GET SPESIFIC ARTICLE AND COMMENT ====================
    it('GET /article/:id should return article and comment', function (done) {
        chai
            .request(app)
            .get(`/articles/${articleId}`)
            .end(function (err, res) {
                expect(res).to.have.status(200)
                done()
            })
    })



    // ==================== DELTE ARTICLE AND COMMENT ====================
    
    // DELETE ARTICLE
    it('/DELETE /articles should return delete article', function (done) {
        chai
            .request(app)
            .del('/articles')
            .set('token', token)
            .send({
                articleId: articleId
            })
            .end(function (err, res){
                expect(res).to.have.status(200)
                done()
            })
    })

    // DELETE COMMENT
    it('DELETE /comment should delete comment', function (done) {
        chai
            .request(app)
            .del('/comment')
            .set('token', token)
            .send({
                commentId: commentId
            })
            .end(function (err, res) {
                expect(res).to.have.status(200)
                done()
            })
    })
})
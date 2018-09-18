<template>
  <div class="col-md-9">
    <h2> <b>Articles </b></h2>
    <!-- bates -->
    <div class="card mb-3" v-for="(article, index) in articles" v-bind:key="index">
      <img class="card-img-top" src="https://via.placeholder.com/800x180" alt="Card image cap">
      <div class="card-body">
        <h5 class="card-title">{{ article.title }}</h5>
        <p class="card-text">{{ article.content }}</p>
        <p class="card-text"><small class="text-muted">Last updated {{ moment(article.updatedAt).fromNow() }}</small></p>
        <router-link :to="{ path: `/edit-article/${article._id}` }" class="btn btn-primary" v-if="article.author.email === emailUser">Edit</router-link>
        <router-link :to="{ path: `/article/${article._id}` }" class="btn btn-info">Show More</router-link>
        <button type="button" class="btn btn-danger" v-if="article.author.email === emailUser" v-on:click="deleteArticle(article._id)">Delete</button>
      </div>
    </div>
  </div>
</template>

<script>
import axios from 'axios'
import moment from 'moment'
export default {
  data: function () {
    return {
      articles: [],
      moment: moment,
      emailUser: localStorage.getItem('email')
    }
  },
  methods: {
    deleteArticle: function (id) {
      axios({
        url: 'http://localhost:3000/articles',
        method: 'delete',
        data: {
          articleId: id
        },
        headers: {
          'token': localStorage.getItem('token')
        }
      })
        .then(response => {
          this.getAllArticle()
        })
        .catch(err => {
          console.log(err)
        })
    },
    getAllArticle: function () {
      axios({
        url: 'http://localhost:3000/articles',
        method: 'get'
      })
        .then(response => {
          let articles = response.data
          this.articles = articles
        })
        .catch(err => {
          console.log(err)
        })
    }
  },
  created: function () {
    axios({
      url: 'http://localhost:3000/articles',
      method: 'get'
    })
      .then(response => {
        let myArticles = 0
        let articles = response.data
        for (let i = 0; i < articles.length; i++) {
          if (articles[i].author.email === this.emailUser) {
            myArticles++
          }
          articles[i].content = articles[i].content.split('')
          articles[i].content.splice(150)
          articles[i].content = articles[i].content.join('')
        }
        this.articles = articles
        this.$emit('article-length', myArticles)
      })
      .catch(err => {
        console.log(err)
      })
  }
}
</script>

<style scoped>
.card {
  /* max-height: 300px; */
}
</style>

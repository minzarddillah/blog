<template>
  <div class="col-md-9">
    <h1>{{ article.title }}</h1>
    <i>created by: {{ article.author.name }}</i> <br> <br>
    <p>{{ article.content }}</p>
    <CommentArticle v-bind:comments="article.comment" v-on:updateComment="getArticle" v-if="token"/>
    <Comments v-bind:comments="article.comment" v-on:getnewarticle="getArticle"/>
  </div>
</template>

<script>
import axios from 'axios'
import CommentArticle from './addComment.vue'
import Comments from './Comments.vue'
export default {
  data: function () {
    return {
      article: { author: { name: '' } },
      token: localStorage.getItem('token')
    }
  },
  components: {
    CommentArticle,
    Comments
  },
  methods: {
    getArticle: function () {
      let idArticle = this.$route.params.id
      axios({
        url: `http://localhost:3000/articles/${idArticle}`,
        method: 'get'
      })
        .then(response => {
          this.article = response.data
        })
    }
  },
  created () {
    this.getArticle()
  }
}
</script>

<style scoped>
p {
  text-align: justify;
}
</style>

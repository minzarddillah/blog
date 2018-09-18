<template>
  <div class="col-md-9">
    <h1>{{ article.title }}</h1>
    <i>created by: {{ article.author.name }}</i> <br> <br>
    <p>{{ article.content }}</p>
  </div>
</template>

<script>
import axios from 'axios'
export default {
  data: function () {
    return {
      article: { author: { name: '' } }
    }
  },
  created () {
    let idArticle = this.$route.params.id
    axios({
      url: `http://localhost:3000/articles/${idArticle}`,
      method: 'get'
    })
      .then(response => {
        this.article = response.data
      })
  }
}
</script>

<style scoped>
p {
  text-align: justify;
}
</style>

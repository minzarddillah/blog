<template>
  <div class="col-md-9">
    <h2> <b> Edit Article </b> </h2>
    <!-- bates -->
    <form>
      <div class="form-group">
        <label for="title">Title</label>
        <input type="text" class="form-control" id="title" v-model="title">
      </div>
      <div class="form-group">
        <label for="content">Content</label>
        <textarea class="form-control" id="content" rows="10" v-model="content"></textarea>
      </div>
    </form>
    <button class="btn btn-primary mb-2" v-on:click="submitUpdateArticle">Update Article</button>
  </div>
</template>

<script>
import axios from 'axios'
export default {
  data: function () {
    return {
      title: '',
      content: ''
    }
  },
  methods: {
    submitUpdateArticle: function () {
      axios({
        url: 'http://localhost:3000/articles',
        method: 'put',
        data: {
          articleId: this.$route.params.id,
          title: this.title,
          content: this.content
        },
        headers: {
          'token': localStorage.getItem('token')
        }
      })
        .then(() => {
          this.$router.replace({ path: '/' })
        })
        .catch(err => {
          console.log(err)
        })
    }
  },
  created: function () {
    let idArticle = this.$route.params.id
    // console.log(idArticle)
    axios({
      url: `http://localhost:3000/articles/${idArticle}`,
      method: 'get'
    })
      .then(response => {
        let article = response.data
        this.title = article.title
        this.content = article.content
      })
  }
}
</script>

<style>

</style>

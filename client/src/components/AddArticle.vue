<template>
  <div class="col-md-9">
    <h2> <b>Add Article </b> </h2>
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
  <button class="btn btn-primary mb-2" v-on:click="submitNewArticle">Add new article</button>
  </div>
</template>

<script>
import axios from 'axios'
export default {
  name: 'addarticle',
  data: function () {
    return {
      title: '',
      content: ''
    }
  },
  methods: {
    submitNewArticle () {
      axios({
        url: 'http://localhost:3000/articles',
        method: 'post',
        data: {
          title: this.title,
          content: this.content,
          test: localStorage.getItem('token')
        },
        headers: { 'token': localStorage.getItem('token') }
      })
        .then(response => {
          this.$router.replace({ path: '/' })
        })
        .catch(err => {
          console.log(err)
        })
    }
  },
  watch: {
    test (newTest, oldTest) {
      console.log(newTest)
    }
  }
}

if (!localStorage.getItem('token')) {
  window.location.replace('/')
}

</script>

<style scoped>
form {
  text-align: left;
}
</style>

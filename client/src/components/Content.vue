<template>
  <center>
    <div class="row container">
      <!-- SIDEBAR -->
      <div class="col-md-3">
        <div class="card" style="margin-top:47px;" v-if="isLogin">
          <img class="card-img-top" src="https://via.placeholder.com/300x180" alt="Card image cap">
          <div class="card-body">
            <h5 class="card-title">Welcome {{ nameUser }}</h5>
            <p class="card-text"><small class="text-muted">total of all your articles is {{ totalArticles }}</small></p>
            <button type="button" class="btn btn-primary btn-lg btn-block">My articles</button>
          </div>
        </div>
        <br>
        <router-link to="/add-article" type="button" class="btn btn-primary btn-lg btn-block" v-if="isLogin">Add new article</router-link>
        <router-link to="/" type="button" class="btn btn-primary btn-lg btn-block" v-if="isLogin">All articles</router-link>

      </div>
      <!-- CONTENT -->
      <router-view v-on:article-length="getTotalArticle"></router-view>
    </div>

  </center>
</template>

<script>
// import axios from 'axios'
let token = localStorage.getItem('token')
export default {
  name: 'contents',
  components: {
  },
  data: function () {
    return {
      articles: [],
      isLogin: false,
      nameUser: '',
      totalArticles: 0
    }
  },
  methods: {
    getTotalArticle: function (total) {
      this.totalArticles = total
    }
  },
  created: function () {
    if (token) {
      this.isLogin = true
      this.nameUser = localStorage.getItem('name')
    }
  }
}
</script>

<style>
.row {
  margin: 20px;
}
</style>

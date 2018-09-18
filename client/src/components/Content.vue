<template>
  <center>
    <div class="row container">
      <div class="col-md-3">
        <div class="card" style="margin-top:47px;" v-if="isLogin">
          <img class="card-img-top" src="https://via.placeholder.com/300x180" alt="Card image cap">
          <div class="card-body">
            <h5 class="card-title">Welcome NAME</h5>
            <p class="card-text"><small class="text-muted">total of all articles NUMBER</small></p>
            <button type="button" class="btn btn-primary btn-lg btn-block">My articles</button>
          </div>
        </div>
        <br>
        <button type="button" class="btn btn-primary btn-lg btn-block" v-if="isLogin">Add new article</button>
        <button type="button" class="btn btn-primary btn-lg btn-block">All articles</button>
      </div>
      <!-- ARTICLES -->
      <div class="col-md-9">
        <h2> <b>Articles </b></h2>
        <div class="card mb-3">
          <img class="card-img-top" src="https://via.placeholder.com/800x180" alt="Card image cap">
          <div class="card-body">
            <h5 class="card-title">Card title</h5>
            <p class="card-text">This is a wider card with supporting text below as a natural lead-in to additional
              content. This content is a little bit longer.</p>
            <p class="card-text"><small class="text-muted">Last updated 3 mins ago</small></p>
          </div>
        </div>
        <div class="card mb-3">
          <img class="card-img-top" src="https://via.placeholder.com/800x180" alt="Card image cap">
          <div class="card-body">
            <h5 class="card-title">Card title</h5>
            <p class="card-text">This is a wider card with supporting text below as a natural lead-in to additional
              content. This content is a little bit longer.</p>
            <p class="card-text"><small class="text-muted">Last updated 3 mins ago</small></p>
          </div>
        </div>
      </div>
    </div>

  </center>
</template>

<script>
// import axios from 'axios'
let token = localStorage.getItem('token')
export default {
  name: 'contents',
  data: function () {
    return {
      articles: [],
      isLogin: false
    }
  },
  created: function () {
    if (token) {
      this.isLogin = true
    }
  }
}
</script>

<style>
.row {
  margin: 20px;
}
</style>

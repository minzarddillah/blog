<template>
  <div id="app">
    <nav class="navbar navbar-expand-sm bg-dark navbar-dark fixed-top">
      <router-link to="/" class="navbar-brand">Home</router-link>
      <router-link to="/about" class="navbar-brand">About</router-link>
      <span class="text-white ml-auto">
        <ul class="navbar-nav">
          <li class="nav-item">
            <a class="nav-link" href="#" data-toggle="modal" data-target="#loginModal" v-if="!isLogin"><b>LOGIN</b></a>
          <li class="nav-item">
            <a class="nav-link" href="#" data-toggle="modal" data-target="#registerModal" v-if="!isLogin"><b>REGISTER</b></a>
          </li>
          <li>
            <a class="nav-link" href="#" v-on:click="logout" v-if="isLogin"><b>LOGOUT</b></a>
          </li>
        </ul>
      </span>
    </nav>
    <div id="nav"></div>
    <router-view />
    <!-- LOGIN MODAL -->
    <div class="modal fade" id="loginModal" tabindex="-1" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">
      <div class="modal-dialog" role="document">
        <div class="modal-content">
          <div class="modal-header">
            <h5 class="modal-title" id="exampleModalLabel">Login</h5>
            <button type="button" class="close" data-dismiss="modal" aria-label="Close">
              <span aria-hidden="true">&times;</span>
            </button>
          </div>
          <div class="modal-body">
            <form>
              <div class="form-group">
                <div class="alert alert-danger" role="alert" v-if="failedLogin">
                  <strong>Oh snap!</strong> Incorrect username or password.
                </div>
                <label for="email">Email address</label>
                <input type="email" class="form-control" v-model="emailLogin" id="email" aria-describedby="emailHelp"
                  placeholder="Enter email">
                <small id="emailHelp" class="form-text text-muted">We'll never share your email with anyone else.</small>
                <label for="password">Password</label>
                <input type="password" class="form-control" v-model="passwordLogin" id="password" placeholder="Password">
              </div>
            </form>
          </div>
          <div class="modal-footer">
            <button type="button" class="btn btn-secondary" data-dismiss="modal">Close</button>
            <button type="button" class="btn btn-primary" v-on:click="login">Login</button>
          </div>
        </div>
      </div>
    </div>
    <!-- REGISTER MODAL -->
    <div class="modal fade" id="registerModal" tabindex="-1" role="dialog" aria-labelledby="exampleModalLabel"
      aria-hidden="true">
      <div class="modal-dialog" role="document">
        <div class="modal-content">
          <div class="modal-header">
            <h5 class="modal-title" id="exampleModalLabel">Register</h5>
            <button type="button" class="close" data-dismiss="modal" aria-label="Close">
              <span aria-hidden="true">&times;</span>
            </button>
          </div>
          <div class="modal-body">
            <form>
              <div class="form-group">
                <label for="name">Name</label>
                <input type="text" class="form-control" v-model="nameRegister" id="name" placeholder="Name">
                <label for="email">Email address</label>
                <input type="email" class="form-control" v-model="emailRegister" id="email" aria-describedby="emailHelp" placeholder="Enter email">
                <small id="emailHelp" class="form-text text-muted">We'll never share your email with anyone else.</small>
                <label for="password">Password</label>
                <input type="password" class="form-control" v-model="passwordRegister" id="password" placeholder="Password">
              </div>
            </form>
          </div>
          <div class="modal-footer">
            <button type="button" class="btn btn-primary" v-on:click="register" data-dismiss="modal">Register</button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import axios from 'axios'
let token = localStorage.getItem('token')
export default {
  data: function () {
    return {
      emailLogin: '',
      passwordLogin: '',
      nameRegister: '',
      emailRegister: '',
      passwordRegister: '',
      failedLogin: false,
      isLogin: false
    }
  },
  methods: {
    login () {
      let email = this.emailLogin
      let password = this.passwordLogin
      axios({
        method: 'post',
        url: 'http://localhost:3000/signin',
        data: {
          email,
          password
        }
      })
        .then(response => {
          let token = response.data.token
          localStorage.setItem('token', token)
          window.location.replace('/')
        })
        .catch(err => {
          console.log(err)
          this.failedLogin = true
        })
    },
    register () {
      axios.post('http://localhost:3000/signup', {
        name: this.nameRegister,
        email: this.emailRegister,
        password: this.passwordRegister
      })
        .then(response => {
          console.log(`masuk responose`)
          console.log(response)
        })
        .catch(err => {
          console.log(JSON.stringify(err))
        })
      // axios({
      //   url: 'http://localhost:3000/signup',
      //   method: 'post',
      //   data: {
      //     name: this.nameRegister,
      //     email: this.emailRegister,
      //     password: this.passwordRegister
      //   }
      // })
      //   .then(response => {
      //     console.log(`masuk then`)
      //     console.log(response)
      //   })
      //   .catch(err => {
      //     console.log(`masuk error`)
      //     console.log(err.message)
      //   })
      console.log(this.nameRegister, this.emailRegister, this.passwordRegister)
    },
    logout () {
      localStorage.clear()
      window.location.replace('/')
    }
  },
  created () {
    if (token) {
      this.isLogin = true
    }
  }
}
</script>
<style>
  #app {
    font-family: 'Avenir', Helvetica, Arial, sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    text-align: center;
    color: #2c3e50;
  }

  #nav {
    padding: 30px;
  }

  #nav a {
    font-weight: bold;
    color: #2c3e50;
  }

  #nav a.router-link-exact-active {
    color: #42b983;
  }
</style>

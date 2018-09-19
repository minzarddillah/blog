<template>
  <div><br>
  <ul class="list-group" v-for="(comment, index) in comments" v-bind:key="index">
    <li class="list-group-item active">{{ comment.userId.email }}</li>
    <li class="list-group-item">{{ comment.content }}</li>
    <span>
    <button type="button" class="btn btn-danger" v-if="emailUser === comment.userId.email" v-on:click="deleteComment(comment._id)">Delete</button>
    </span>
  </ul>
  </div>
</template>

<script>
import axios from 'axios'
export default {
  props: ['comments'],
  data: function () {
    return {
      emailUser: localStorage.getItem('email')
    }
  },
  methods: {
    deleteComment: function (id) {
      // console.log(id)
      axios({
        url: 'http://localhost:3000/comment',
        method: 'delete',
        headers: {
          'token': localStorage.getItem('token')
        },
        data: {
          commentId: id
        }
      })
        .then(response => {
          this.$emit('getnewarticle')
        })
        .catch(err => {
          console.log(err)
        })
    }
  }
}
</script>

<style>

</style>

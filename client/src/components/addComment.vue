<template>
  <div>
    <form>
      <div class="form-group">
        <label for="addComment">Add Comment</label>
        <textarea class="form-control" id="addComment" rows="3" v-model="comment"></textarea>
      </div>
    </form>
    <button type="button" class="btn btn-info" v-on:click="submitComment">Submit Comment</button>
  </div>
</template>

<script>
import axios from 'axios'
export default {
  props: ['comments'],
  data: function () {
    return {
      comment: ''
    }
  },
  methods: {
    submitComment: function () {
      let articleId = this.$route.params.id
      axios({
        url: 'http://localhost:3000/comment',
        method: 'post',
        headers: {
          'token': localStorage.getItem('token')
        },
        data: {
          articleId: articleId,
          content: this.comment
        }
      })
        .then(response => {
          this.comment = ''
          this.$emit('updateComment')
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

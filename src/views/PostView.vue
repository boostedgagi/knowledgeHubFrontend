<template>
  <div class="container py-5">

    <div class="row mb-5">
      <div class="col-md-8 offset-md-2">
        <div class="card shadow-sm">
          <div class="card-body">
            <h3 class="card-title">{{ post.title }}</h3>
            <p class="card-text">{{ post.postContent }}</p>
            <p class="text-muted small">Author: {{ post.user?.firstName }} {{ post.user?.lastName }} </p>
          </div>
        </div>
      </div>
    </div>

    <!-- Comments Section -->
    <div v-if="commentsCount>0">
      <div class="row">
        <div class="col-md-8 offset-md-2">
          <h5>({{ commentsCount }} comments )</h5>
          <div
              class="card mb-3"
              v-for="comment in comments"
              :key="comment.id"
          >
            <div class="card-body">
              <p>{{ comment.content }}</p>
              <p class="text-muted small mb-0"> {{ comment.createdAt }}</p>
            </div>
          </div>
        </div>
      </div>
      <!-- Add Comment -->
      <div class="card mt-4">
        <div class="card-body">
          <h6 class="card-subtitle mb-2 text-muted">Add comment</h6>
          <div class="mb-3">
              <textarea
                  class="form-control"
                  rows="3"
                  v-model="newComment"
                  placeholder="Your comment..."
              ></textarea>
          </div>
          <button class="btn btn-primary" @click="addComment">Add comment</button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import axios from "axios";

export default {
  name: "PostView",
  data() {
    return {
      post: {},
      comments: [],
      newComment: ""
    }
  },
  methods: {
    async getPost() {
      const postId = this.$route.params.id;
      try {
        const response = await axios.get(`${this.api}/posts/${postId}`);
        this.post = response.data.data;
        this.comments = this.post.comments;
        console.log(this.post);
      } catch (error) {
        console.log(error);
      }
    }
  },
  created() {
    this.getPost();
  },
  computed: {
    commentsCount() {
      return this.comments?.length || 0;
    }
  }
}
</script>

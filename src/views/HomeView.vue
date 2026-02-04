<template>
  <div class="container py-5">

    <div class="row mb-4">
      <div class="col-md-8 offset-md-2">
        <div class="input-group">
          <input
              type="text"
              class="form-control"
              placeholder="Find..."
              v-model="searchQuery"
          >
          <button class="btn btn-primary" @click="search">
            Find
          </button>
        </div>
      </div>
    </div>

    <!-- Cards List -->
    <div class="container border d-flex flex-column align-items-center">
      <div
          class="col-md-6 mb-6"
          v-for="post in posts"
          :key="post.id"
      >
        <div class="card h-auto mb-4">
          <div class="card-body">
            <h5 class="card-title">#{{post.id}} {{ post.title }}</h5>
            <p class="card-text">{{post.postContent}}</p>
            <p class="card-text">{{ post.category.title }} | {{getCommentsCount(post)}} comments</p>
            <p class="card-text">{{ post.userId }}</p>
            <a @click="redirectToPostPage(post)" class="btn btn-outline-primary">Show more</a>
          </div>
        </div>

        <div v-for="comment in comments" :key="comment.id">
          <div class="card h-100">
            <div class="card-body">
              <h5 class="card-title">{{ comment.title }}</h5>
              <a href="#" class="btn btn-outline-primary">More...</a>
            </div>
          </div>
        </div>
      </div>
    </div>

  </div>
</template>
<script>
import axios from "axios";
import router from "@/router";

export default {
  name: 'HomeView',
  data() {
    return {
      posts: [],
      searchQuery: "",
    }
  },
  created() {
    this.getPosts();
  },
  methods: {
    search() {
    },
    async getPosts() {
      try {
        const response = await axios.get(this.api + '/posts');
        this.posts = response.data.data || [];
        this.comments = this.posts.comments;
      } catch (error) {
        this.error = "Could not load posts.";
      }
    },
    getCommentsCount(post){
      if(post.comments.count>0){
        return post.comments.count;
      }
      return 0;
    },
    redirectToPostPage(post){
      router.push(`/post/${post.id}`)
    }
  }
}


</script>

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
        <div class="card h-100 mb-4">
          <div class="card-body">
            <h5 class="card-title">{{post.title}}</h5>
            <p class="card-text">{{ post.postContent }}</p>
            <p class="card-text">{{ post.category.title }}</p>
            <p class="card-text">User id</p>
            <a href="#" class="btn btn-outline-primary">Show</a>
          </div>
        </div>

        <div class="card h-100">
          <div class="card-body">
            <h5 class="card-title">{{ card.title }}</h5>
            <p class="card-text">{{ card.description }}</p>
            <a href="#" class="btn btn-outline-primary">Detaljnije</a>
          </div>
        </div>
      </div>
    </div>

  </div>
</template>
<script>

import axios from "axios";

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
        this.posts = response.data.data||[];
      } catch (error) {
        this.error = "Could not load posts.";
      }
    }
  }
}


</script>

<template>
  <div class="container py-5">

    <!-- Question Section -->
    <div class="row mb-5">
      <div class="col-md-8 offset-md-2">
        <div class="card shadow-sm">
          <div class="card-body">
            <h3 class="card-title">{{ }}</h3>
            <p class="card-text">{{ }}</p>
            <p class="text-muted small">Postavio: {{  }}</p>
          </div>
        </div>
      </div>
    </div>

    <!-- Comments Section -->
    <div class="row">
      <div class="col-md-8 offset-md-2">
        <h5>Komentari (broj komentara{{ }})</h5>
        <div
            class="card mb-3"
            v-for="comment in comments"
            :key="comment.id"
        >
          <div class="card-body">
            <p>{{  }}</p>
            <p class="text-muted small mb-0">Od: {{  }}</p>
          </div>
        </div>

        <!-- Add Comment -->
        <div class="card mt-4">
          <div class="card-body">
            <h6 class="card-subtitle mb-2 text-muted">Dodaj komentar</h6>
            <div class="mb-3">
              <textarea
                  class="form-control"
                  rows="3"
                  v-model="newComment"
                  placeholder="Napiši komentar..."
              ></textarea>
            </div>
            <button class="btn btn-primary" @click="addComment">Postavi komentar</button>
          </div>
        </div>

      </div>
    </div>

  </div>
</template>

<script>

export default {
  name: "PostView",
  data() {
    return {
      post: {
      },
      comments: [
      ],
      newComment: ""
    }
  }
}
</script>

<style scoped>
.card {
  border-radius: 0.5rem;
}
</style>

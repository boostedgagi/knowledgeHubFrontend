<template>
  <div class="container py-5">

    <div class="row">
      <div class="col-md-8 offset-md-2">

        <!-- Form Card -->
        <div class="card shadow-sm">
          <div class="card-body">
            <h3 class="card-title mb-4">Ask new question</h3>

            <!-- Title Input -->
<!--            <div class="mb-3">-->
<!--              <label for="postTitle" class="form-label">Post title</label>-->
<!--              <input-->
<!--                  type="text"-->
<!--                  id="postTitle"-->
<!--                  class="form-control"-->
<!--                  v-model="title"-->
<!--                  placeholder="Type post title"-->
<!--              >-->
<!--            </div>-->

            <!-- Body Textarea -->
            <div class="mb-3">
              <label for="postBody" class="form-label">Content</label>
              <textarea
                  id="postBody"
                  class="form-control"
                  rows="6"
                  v-model="body"
                  placeholder="Type your question..."
              ></textarea>
            </div>

            <!-- Submit Button -->
            <button class="btn btn-primary" @click="submitPost">Ask</button>

          </div>
        </div>

        <!-- Optional Success Message -->
        <div
            v-if="successMessage"
            class="alert alert-success mt-3"
            role="alert"
        >
          {{ successMessage }}
        </div>

      </div>
    </div>

  </div>
</template>

<script>
export default {
  name: "NewPost",
  data() {
    return {
      title: "",
      body: "",
      successMessage: ""
    }
  },
  methods: {
    submitPost() {
      if (!this.title.trim() || !this.body.trim()) {
        alert("Please fill title and content of your post/question!");
        return;
      }

      // backend logic
      // npr. axios.post('/api/posts', { title: this.title, body: this.body })

      console.log("New question:", { title: this.title, body: this.body });

      this.successMessage = "Your post/question is successfully posted!";
      this.title = "";
      this.body = "";
    }
  }
}
</script>

<style scoped>
.card {
  border-radius: 0.5rem;
}
</style>

<template>
  <div class="container py-5">
    <div class="row">
      <div class="col-md-6 offset-md-3">

        <div class="card shadow-sm">
          <div class="card-body">
            <h3 class="card-title mb-4 text-center">Login</h3>

            <!-- Email Input -->
            <div class="mb-3">
              <label for="email" class="form-label">Email</label>
              <input
                  type="email"
                  id="email"
                  class="form-control"
                  v-model="email"
                  placeholder="Enter your email"
              >
            </div>

            <!-- Password Input -->
            <div class="mb-3">
              <label for="password" class="form-label">Password</label>
              <input
                  type="password"
                  id="password"
                  class="form-control"
                  v-model="password"
                  placeholder="Enter your password"
              >
            </div>

            <!-- Submit Button -->
            <button class="btn btn-primary w-100" @click="loginUser">Login</button>

            <!-- Optional Message -->
            <div v-if="message" class="alert alert-danger mt-3" role="alert">
              {{ message }}
            </div>

          </div>
        </div>

      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "LoginView",
  data() {
    return {
      email: "",
      password: "",
      message: ""
    }
  },
  methods: {
    loginUser() {
      if (!this.email.trim() || !this.password.trim()) {
        alert("Please enter both email and password!");
        return;
      }

      console.log("Login attempt:", { email: this.email, password: this.password });

      this.message = "";
    }
  }
}
</script>

<style scoped>
.card {
  border-radius: 0.5rem;
}
</style>

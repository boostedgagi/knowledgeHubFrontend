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
            <button class="btn btn-primary w-100" @click="login()">Login</button>

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
import axios from "axios";

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
    async login() {
      if (!this.email.trim() || !this.password.trim()) {
        alert("Please enter both email and password!");
        return;
      }
      try {
        const response = await axios.post(this.api+"/login", {
          email: this.email,
          password: this.password
        });
        if (response.data.token) {
          localStorage.setItem("token", response.data.token);
        }
        alert('Login successfull!');
      } catch (error) {
        console.log('Login failed', error);
        if (error.response) {
          alert("Invalid credentials!");
        }
      }

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

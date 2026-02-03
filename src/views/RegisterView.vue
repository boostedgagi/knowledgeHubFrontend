<template>
  <div class="container py-5">
    <div class="row">
      <div class="col-md-6 offset-md-3">

        <div class="card shadow-sm m-1">
          <div class="card-body">
            <h3 class="card-title mb-4 text-center">Register</h3>

            <!-- First Name -->
            <div class="mb-3">
              <label for="firstName" class="form-label">First Name</label>
              <input
                  type="text"
                  id="firstName"
                  class="form-control"
                  v-model="firstName"
                  placeholder="Enter your first name"
              >
            </div>

            <!-- Last Name -->
            <div class="mb-3">
              <label for="lastName" class="form-label">Last Name</label>
              <input
                  type="text"
                  id="lastName"
                  class="form-control"
                  v-model="lastName"
                  placeholder="Enter your last name"
              >
            </div>

            <!-- Email -->
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

            <!-- Password -->
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
            <button class="btn btn-primary w-100" @click="register()">Register</button>

            <!-- Optional Message -->
            <div v-if="message" class="alert alert-success mt-3" role="alert">
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
  name: "RegisterView",
  data() {
    return {
      firstName: "",
      lastName: "",
      email: "",
      password: "",
      message: ""
    }
  },
  methods: {
    async register() {
      if (!this.firstName.trim() || !this.lastName.trim() || !this.email.trim() || !this.password.trim()) {
        this.message = "Please fill in all fields!";
        return;
      }

      try {
        const response = await axios.post(this.api+"/users", {
          firstName: this.firstName,
          lastName: this.lastName,
          email: this.email,
          password: this.password
        });
        console.log(response);
        alert('Registration successful!');

        this.firstName = "";
        this.lastName = "";
        this.email = "";
        this.password = "";
      } catch (error) {
        console.error(error);
      }
    }
  }
}
</script>

<style scoped>
</style>

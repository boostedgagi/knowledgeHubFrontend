<template>
  <nav class="container">
    <div class="row">
      <div class="col">
        <router-link to="/">Home</router-link>
      </div>|
      <div class="col">
        <router-link to="/about">About</router-link>
      </div>|
      <div class="col">
        <router-link to="/post">Post</router-link>
      </div>|
      <div class="col">
        <router-link to="/ask">Ask</router-link>
      </div>|
      <div class="col">
        <router-link to="/profile">Profile</router-link>
      </div>|
      <div class="col">
        <router-link v-if="!auth.isLogged" to="/login">Login</router-link>
      </div>|
      <div class="col">
        <router-link v-if="!auth.isLogged" to="/register">Register</router-link>
      </div>|
      <div class="col">
        <router-link v-if="auth.isLogged" @click="auth.logout()" to="/login">Logout</router-link>
      </div>
      <div class="col">
        <router-link v-if="'Administrator'===auth.role" to="/admin">Admin dashboard </router-link>
      </div>
    </div>
  </nav>
  <router-view/>
</template>

<script setup>
import { useAuthStore } from "@/stores/auth";
const auth = useAuthStore();
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}

nav {
  padding: 30px;
}

nav a {
  font-weight: bold;
  color: #2c3e50;
}

nav a.router-link-exact-active {
  color: #42b983;
}
</style>

import { createRouter, createWebHashHistory } from 'vue-router'
import HomeView from "@/views/HomeView";

const routes = [
  {
    path: '/',
    name: 'home',
    component: HomeView
  },
  {
    path: '/login',
    name: 'login',
    component: () => import('../views/LoginView.vue')
  },
  {
    path:'/register',
    name:'register',
    component: () => import('../views/RegisterView.vue')
  },
  {
    path:'/post',
    name:'post',
    component: () => import('../views/PostView.vue')
  },
]

const router = createRouter({
  history: createWebHashHistory(),
  routes
})

export default router

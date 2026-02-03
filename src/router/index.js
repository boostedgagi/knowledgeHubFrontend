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
  {
    path:'/ask',
    name:'ask',
    meta: { requiresAuth: true },
    component: () => import('../views/NewPostView.vue')
  },
  {
    path:'/profile',
    name:'profile',
    meta: { requiresAuth: true },
    component: () => import('../views/ProfileView.vue')
  },
  {
    path:'/admin',
    name:'admin',
    meta: { requiresAuth: true },
    component: () => import('../views/AdminView')
  },
]

const router = createRouter({
  history: createWebHashHistory(),
  routes
})

router.beforeEach((to, from, next) => {
  const token = localStorage.getItem("token");

  if (to.meta.requiresAuth && !token) {
    next({ name: "login" });
  } else {
    next();
  }
});

export default router

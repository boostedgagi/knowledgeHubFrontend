import { createRouter, createWebHashHistory } from 'vue-router'
import HomeView from "@/views/HomeView";
import LoginView from "@/views/LoginView";
import RegisterView from "@/views/RegisterView";
import PostView from "@/views/PostView";
import newPostView from "@/views/NewPostView";
import ProfileView from "@/views/ProfileView";
import AdminView from "@/views/AdminView";

const routes = [
  {
    path: '/',
    name: 'home',
    component: HomeView
  },
  {
    path: '/login',
    name: 'login',
    component: LoginView
  },
  {
    path:'/register',
    name:'register',
    component: () => RegisterView
  },
  {
    path:'/post/:id',
    name:'post',
    component: () => PostView
  },
  {
    path:'/ask',
    name:'ask',
    meta: { requiresAuth: true },
    component: () => newPostView
  },
  {
    path:'/profile',
    name:'profile',
    meta: { requiresAuth: true },
    component: () => ProfileView
  },
  {
    path:'/admin',
    name:'admin',
    meta: { requiresAuth: true },
    component: () => AdminView
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

import { createRouter, createWebHistory } from 'vue-router';
import SignupView from '../views/SignupView.vue';
import LoginView from '../views/LoginView.vue';
import FriendsView from '../views/FriendsView.vue';
const routes = [
  {
    path: '/signup',
    name: 'Signup',
    component: SignupView
  },
  {
    path:'/login',
    name:'Login',
    component:LoginView
  },
  {
    path:'/friends',
    name:'Friends',
    component:FriendsView
  },
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

export default router
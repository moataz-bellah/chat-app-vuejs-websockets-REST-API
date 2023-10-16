import { createRouter, createWebHistory } from 'vue-router';
import SignupView from '../views/SignupView.vue';
import ChatView from '../views/ChatView.vue';
import LoginView from '../views/LoginView.vue';
import FriendsView from '../views/FriendsView.vue';
import PeopleView from '../views/PeopleView.vue';
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
  {
    path:'/chat/:userId/:friendName',
    name:'Chat',
    component:ChatView,
    props:true
  },
  {
    path:'/people',
    name:'People',
    component:PeopleView,
    props:true
  }
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

export default router

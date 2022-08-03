import { createRouter, createWebHistory } from 'vue-router'
import HomePage from './components/HomePage.vue'
import LogIn from './components/LogIn.vue'
import SignUp from './components/SignUp.vue'
import LogOut from './components/LogOut.vue'

const routes = [
  { path: '/', component: HomePage },
  { path: '/login', component: LogIn },
  { path: '/signup', component: SignUp },
  { path: '/logout', component: LogOut },
]

const router = createRouter({
  history: createWebHistory(),
  routes,
})

export default router

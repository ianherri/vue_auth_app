import { createRouter, createWebHistory } from 'vue-router'
import HomePage from './views/HomePage.vue'
import LogIn from './views/LogIn.vue'
import SignUp from './views/SignUp.vue'
import LogOut from './components/LogOut.vue'
import PartyChat from './views/PartyChat.vue'
import SingleMessage from './views/SingleMessage.vue'

const routes = [
  { path: '/', component: HomePage },
  { path: '/login', component: LogIn },
  { path: '/signup', component: SignUp },
  { path: '/logout', component: LogOut },
  { path: '/party', component: PartyChat },
  { path: '/message/:id', component: SingleMessage },
]

const router = createRouter({
  history: createWebHistory(),
  routes,
})

export default router

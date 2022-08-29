import { createRouter, createWebHistory } from 'vue-router'
import HomePage from './views/HomePage.vue'
import LogIn from './views/LogIn.vue'
import SignUp from './views/SignUp.vue'
import LogOut from './components/LogOut.vue'
import PartyChat from './views/PartyChat.vue'
import SingleMessage from './views/SingleMessage.vue'
import CreateDescription from './views/CreateDescriptions.vue'
import useAuth from './composables/auth'

const routes = [
  { path: '/', component: HomePage },
  { path: '/login', component: LogIn },
  { path: '/signup', component: SignUp },
  { path: '/logout', component: LogOut },
  { path: '/party', component: PartyChat },
  { path: '/message/:id', component: SingleMessage },
  { path: '/createdescription', component: CreateDescription },
]

const router = createRouter({
  history: createWebHistory(),
  routes,
})

const { loggedIn, getUser } = useAuth()

// TODO; when direct navigating it doesn't wait for loggedIn value to update
router.beforeEach(async (to) => {
  await getUser()
  if (!loggedIn.value && to.path === ('/signup' || '/login')) {
    return true
  } else if (!loggedIn.value && to.path !== ('/login' || '/signup')) {
    return { path: '/login' }
  }
})

export default router

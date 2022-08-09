import axios from 'axios'
import { ref, onMounted } from 'vue'

axios.defaults.withCredentials = true

// returns a response to determine if user can make request
// check response.status

// basically all the responses from the server will let us know if we are authenticated. The verification happens on the server side.

// TODO: destroy session on browser close

const loaded = ref(false)
const loggedIn = ref(false)
const loading = ref(true)
const user = ref({})

async function makeAuthRequest() {
  const response = await axios
    .get('http://localhost:8000/home')
    .catch((error) => {
      console.log(error)
      return { error: 'Not authenticated, please log in' }
    })
  console.log(response)
  return response
}

async function makeWeb3AuthRequest(creds) {
  const response = await axios
    .post('http://localhost:8000/web3login', creds)
    .catch((error) => {
      console.log(error)
      return { error: 'web3 login failed' }
    })
  loggedIn.value = true
  user.value = response.data
  return response
}

async function logOut() {
  const response = await axios
    .get('http://localhost:8000/logout')
    .catch((error) => {
      console.log(error)
      return { error: 'Log out error, try again' }
    })
  if (!response.error) {
    loggedIn.value = false
    user.value = {}
  }
  return response
}

async function logIn(creds) {
  const response = await axios
    .post('http://localhost:8000/login', creds)
    .catch((error) => {
      console.log(error)
      return { error: 'Log in error, try again' }
    })
  if (!response.error) {
    loggedIn.value = true
    user.value = response.data
  }
  return response
}

async function getUser() {
  const user = await axios.get('http://localhost:8000/user').catch((error) => {
    console.log(error)
    return { error: 'Not authenticated' }
  })
  if (!user.error) {
    loggedIn.value = true
    console.log(loggedIn.value)
  } else {
    console.log(loggedIn.value)
    loggedIn.value = false
  }
  return user
}

async function signUp(user) {
  const response = await axios
    .post('http://localhost:8000/signup', user)
    .catch((error) => {
      console.log(error)
      if (error.response.status === 400)
        return { error: 'this email has already been taken' }
      else {
        return { error: 'some other signup error' }
      }
    })
  return response
}

export default function useAuth() {
  onMounted(async () => {
    if (!loaded.value) {
      const res = await getUser()
      loaded.value = true
      if (!res.error) {
        loggedIn.value = true
        user.value = res.data
      }
      loading.value = false
    }
  })

  return {
    makeAuthRequest,
    logOut,
    logIn,
    getUser,
    signUp,
    loggedIn,
    user,
    loading,
    makeWeb3AuthRequest,
  }
}

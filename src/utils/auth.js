import axios from 'axios'
import { ref, onMounted } from 'vue'

axios.defaults.withCredentials = true

// returns a response to determine if user can make request
// check response.status
//

const loaded = ref(false)
const loggedIn = ref(false)

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

async function logOut() {
  const response = await axios
    .get('http://localhost:8000/logout')
    .catch((error) => {
      console.log(error)
      return { error: 'Log out error, try again' }
    })
  if (!response.error) {
    loggedIn.value = false
  }
  return response
}

async function logIn(user) {
  const response = await axios
    .post('http://localhost:8000/login', user)
    .catch((error) => {
      console.log(error)
      return { error: 'Log in error, try again' }
    })
  if (!response.error) {
    loggedIn.value = true
  }
  return response
}

async function getUser() {
  const user = await axios.get('http://localhost:8000/user').catch((error) => {
    console.log(error)
    return { error: 'Not authenticated' }
  })
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
      const user = await getUser()
      loaded.value = true
      if (!user.error) {
        loggedIn.value = true
      }
    }
  })

  return { makeAuthRequest, logOut, logIn, getUser, signUp, loggedIn }
}

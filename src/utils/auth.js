import axios from 'axios'

axios.defaults.withCredentials = true

// returns a response to determine if user can make request
// check response.status
//

async function makeAuthRequest() {
  const response = await axios
    .get('http://localhost:8000/home')
    .catch((error) => {
      console.log(error)
    })
  const ans = await response
  console.log(ans)
}

async function logOut() {
  const response = await axios
    .get('http://localhost:8000/logout')
    .catch((error) => {
      console.log(error)
    })
  const ans = await response
  console.log(ans)
}

async function logIn(user) {
  const response = await axios
    .post('http://localhost:8000/login', user)
    .catch((error) => {
      console.log(error)
    })
  return response
}

export { makeAuthRequest, logOut, logIn }

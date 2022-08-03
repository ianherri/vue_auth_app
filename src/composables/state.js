/// access mutate and return user data
import axios from 'axios'

axios.defaults.withCredentials = true

async function getUser() {
  const user = await axios.get('http://localhost:8000/user').catch((error) => {
    console.log(error)
    return { error: 'not logged in' }
  })
  return user
}

export { getUser }

import axios from 'axios'
import { ref, onMounted } from 'vue'

axios.defaults.withCredentials = true

const messages = ref([])
const loaded = ref(false)
const loading = ref(true)

async function postMessage(message) {
  const response = await axios
    .post('http://localhost:8000/messages', message)
    .catch((error) => {
      console.log(error)
      return { error: 'something happened bad trying to post this' }
    })
  return response
}
async function getMessages() {
  const response = await axios
    .get('http://localhost:8000/messages')
    .catch((error) => {
      console.log(error)
      return { error: 'something happened bad trying to get messages' }
    })
  return response
}

async function getMessage(id) {
  const response = await getMessages()
  console.log(id)
  const message = response.data.filter((message) => message._id === id)[0]
  console.log(message)
  return message
}
async function getReplies(id) {
  const response = await getMessages()
  console.log(id)
  const replies = response.data.filter((message) => message.parentId === id)[0]
  console.log(replies)
  return replies
}

export default function useState() {
  onMounted(async () => {
    if (!loaded.value) {
      const res = await getMessages()
      loaded.value = true
      if (!res.error) {
        messages.value = res.data
      }
      loading.value = false
    }
  })
  return { postMessage, messages, getMessage, getReplies }
}

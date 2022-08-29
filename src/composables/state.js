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

async function upVote(messageId) {
  const response = await axios
    .post('http://localhost:8000/messages/upvote', messageId)
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
  const message = response.data.filter((message) => message._id === id)[0]
  return message
}

async function getReplies(id) {
  const response = await getMessages()
  const replies = response.data.filter((message) => message.parentId === id)
  return replies
}

async function createDescription(text) {
  const prompt = {
    prompt: `Write a product description for a ${text.title} using the words: ${text.seedWords}`,
  }
  const description = await axios
    .post('http://localhost:8000/textcompletion', prompt)
    .catch((error) => {
      console.log(error)
      return { error: 'something happened bad trying to create a description' }
    })
  return description
  /*  console.log(title)
  return 'placeholder description' */
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
  return {
    createDescription,
    postMessage,
    messages,
    getMessage,
    getReplies,
    upVote,
  }
}

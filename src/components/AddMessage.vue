<template>
  <div class="add-message-wrapper">
    <form>
      <textarea
        v-model="message.text"
        class="message-input"
        type="text"
        placeholder="say something..."
      >
      </textarea>
      <button @click.prevent="handleMessage" class="btn">Send</button>
    </form>
    <div v-if="msg.length > 0">{{ msg }}</div>
  </div>
</template>

<script setup>
import { defineProps, toRefs, ref } from 'vue'

import useState from '../composables/state'

const msg = ref('')

const props = defineProps({
  user: Object,
})
const { user } = toRefs(props)
const { postMessage } = useState()

const message = ref({ text: '' })

async function handleMessage() {
  const response = await postMessage({
    text: message.value.text,
    username: user.value.name,
    reply: false,
    parentId: null,
  })
  if (response.error) {
    msg.value.push(response.error)
  }
  message.value.text = ''
  console.log(response)
}
</script>

<style>
.add-message-wrapper {
  border-radius: 8px;
  display: flex;
  min-width: 250px;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  padding: 20px;
  gap: 15px;
  background: #ffffff;
  box-shadow: 0px 0px 20px rgba(0, 0, 0, 0.1);
  transition: all 1000ms;
}
.message-input {
  resize: none;
  display: block;
  align-self: right;
  min-width: auto;
  width: 100%;
  border: 1px solid #d2d2d2;
  border-radius: 4px;
  padding: 2px;
  box-sizing: border-box;
}
</style>

<template>
  <form>
    <textarea
      v-model="message.text"
      class="message-input"
      type="text"
      placeholder="reply..."
    >
    </textarea>
    <button @click.prevent="handleMessage" class="btn">Reply</button>
  </form>
  <div v-if="msg.length > 0">{{ msg }}</div>
</template>

<script setup>
import { defineProps, toRefs, ref } from 'vue'

import useState from '../composables/state'

const msg = ref('')

const props = defineProps({
  user: Object,
  parentId: String,
})
const { user, parentId } = toRefs(props)

const { postMessage } = useState()

const message = ref({ text: '' })

async function handleMessage() {
  const response = await postMessage({
    text: message.value.text,
    username: user.value.name,
    reply: true,
    parentId: parentId.value,
  })
  if (response.error) {
    msg.value.push(response.error)
  }
  message.value.text = ''
}
</script>

<style>
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

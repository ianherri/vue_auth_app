<template>
  <div class="message-wrapper">
    <div class="message" @click.prevent="handleMessageClick(message)">
      <h4 class="username-label">@ {{ message.username }}:</h4>
      <div>{{ message.text }}</div>
      <p class="time-label">
        posted at: {{ format(message.timestamp, 'YYYY-MM-DD HH:mm') }}
      </p>
    </div>
  </div>
  <div v-if="reply">
    <AddMessage />
  </div>
</template>

<script setup>
import { defineProps, toRefs, ref } from 'vue'
import { format } from 'date-format-parse'
import { useRouter } from 'vue-router'
import AddMessage from '../components/AddMessage.vue'

const router = useRouter()
const reply = ref(false)
const props = defineProps({
  message: Object,
})
const { message } = toRefs(props)

function handleMessageClick(message) {
  router.push(`/message/${message._id}`)
}
</script>

<style>
.message-wrapper {
  border-radius: 8px;
  display: flex;
  flex-direction: column;
  flex-wrap: wrap;
  flex-grow: 0;
  padding: 20px;
  min-width: 200px;
  max-width: fit-content;
  gap: 10px;
  background: #ffffff;
  box-shadow: 0px 0px 20px rgba(0, 0, 0, 0.1);
  transition: all 1000ms;
  cursor: pointer;
}
.message {
  display: flex;
  flex-direction: column;
  gap: 10px;
}

.time-label {
  color: rgb(109, 109, 109);
  font-size: 10px;
}

.username-label {
  color: rgb(255, 187, 28);
}
</style>

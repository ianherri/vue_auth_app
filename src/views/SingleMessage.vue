<template>
  <div class="content-container">
    <a @click.prevent="handleRefresh">refresh</a>
    <MessageComponent :message="message" :user="user" />
    <div v-for="reply in replies" :key="reply._id">
      <RepliesComponent :reply="reply" />
    </div>
  </div>
</template>

<script setup>
import MessageComponent from '@/components/MessageComponent.vue'
import RepliesComponent from '@/components/RepliesComponent.vue'
import useState from '../composables/state'
import useAuth from '../composables/auth'
import { onMounted, ref } from 'vue'
import { useRoute } from 'vue-router'

const param = useRoute().params.id
const message = ref({})
const replies = ref([])

const { user } = useAuth()

onMounted(async () => {
  console.log('are we here')
  message.value = await useState().getMessage(param)
  replies.value = await useState().getReplies(param)
  console.log(replies.value)
})

async function handleRefresh() {
  message.value = await useState().getMessage(param)
  replies.value = await useState().getReplies(param)
}
</script>

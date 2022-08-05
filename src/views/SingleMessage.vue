<template>
  <div class="content-container">
    <MessageComponent :message="message" />
    <MessageComponent :message="message" />
  </div>
</template>

<script setup>
import MessageComponent from '@/components/MessageComponent.vue'
import useState from '../composables/state'
import { onMounted, ref } from 'vue'
import { useRoute } from 'vue-router'

const param = useRoute().params.id
const message = ref({})
const replies = ref([])

onMounted(async () => {
  console.log('are we here')
  message.value = await useState().getMessage(param)
  // get replies
  console.log(replies)
})
</script>

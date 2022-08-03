<template>
  <div>Hello, user, you are: {{ user.name }}</div>
  <div>{{ error[0] }}</div>
</template>

<script setup>
import { getUser } from '../composables/state'
import { onMounted, ref } from 'vue'
const user = ref({})
const error = ref([])

onMounted(async () => {
  let res = await getUser()
  if (res.error) {
    error.value.push(res.error)
  } else {
    user.value = res.data
  }
})
</script>

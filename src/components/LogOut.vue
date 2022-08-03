<template>
  <div>Goodbye</div>
  <button @click.prevent="handleLogOut">logout</button>
</template>

<script setup>
import { logOut } from '@/utils/auth'
import { onMounted } from 'vue'
import { useRouter } from 'vue-router'

const router = useRouter()

onMounted(() => {
  logOut()
  router.push('/login')
})
</script>

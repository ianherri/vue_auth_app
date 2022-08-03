<template>
  <div></div>
</template>

<script setup>
import useAuth from '@/utils/auth'
import { onMounted } from 'vue'
import { useRouter } from 'vue-router'

const router = useRouter()

onMounted(async () => {
  await useAuth().logOut()
  router.push('/login')
})
</script>

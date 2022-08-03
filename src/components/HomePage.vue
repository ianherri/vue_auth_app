<template>
  <div class="content-container">
    <div class="content-wrapper">
      <div class="content">Hello, user, you are: {{ user.name }}</div>
      <div class="content">{{ error[0] }}</div>
    </div>
  </div>
</template>

<script setup>
import useAuth from '../utils/auth'
import { onMounted, ref } from 'vue'
const user = ref({})
const error = ref([])

onMounted(async () => {
  const res = await useAuth().getUser()
  if (res.error) {
    console.log(res.error)
    error.value.push(res.error)
  } else {
    user.value = res.data
  }
})
</script>

<style>
.content-container {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  height: 100vh;
  background-color: rgb(255, 255, 255);
}

.content-wrapper {
  border-radius: 8px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  padding: 20px;
  gap: 15px;
  background: #ffffff;
  box-shadow: 0px 0px 20px rgba(0, 0, 0, 0.1);
}
.content {
  flex: none;
  order: 0;
  flex-grow: 0;
  font-family: Arial, Helvetica, sans-serif;
  font-style: normal;
  font-weight: 500;
  font-size: 14px;
  line-height: 17px;
  justify-content: center;
}
</style>

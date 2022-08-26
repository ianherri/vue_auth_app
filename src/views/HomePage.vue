<template>
  <div class="loading" v-if="loading">loading</div>

  <div v-else>
    <div v-if="loggedIn" class="content-container">
      <div class="content-wrapper">
        <h3>Hello, {{ user.name }}</h3>
        <EditUser :user="user" />
      </div>
    </div>
    <div v-if="!loggedIn" class="content-container">
      <LoginRedirect />
    </div>
  </div>
</template>

<script setup>
import useAuth from '../composables/auth'
import LoginRedirect from '@/components/LoginRedirect.vue'
import EditUser from '@/components/EditUser.vue'

const { loggedIn, user, loading } = useAuth()
</script>

<style>
.content-container {
  display: flex;
  flex-direction: column;
  justify-content: top;
  align-items: center;
  padding-top: 60px;
  height: 100vh;
  gap: 20px;
  background-color: rgb(255, 255, 255);
}

.content-wrapper {
  border-radius: 8px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  min-width: 200px;
  gap: 15px;
  background: #ffffff;
  transition: all 1000ms;
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

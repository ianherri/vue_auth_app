<template>
  <form @submit.prevent="handleLogIn">
    <h3>Log In</h3>

    <div class="form-group">
      <label>Email</label>
      <input
        v-model="user.email"
        type="email"
        class="form-control"
        placeholder="email"
      />
    </div>
    <div class="form-group">
      <label>Password</label>
      <input
        v-model="user.password"
        type="password"
        class="form-control"
        placeholder="password"
      />
    </div>

    <button class="btn btn-primary btn-block">Login</button>
  </form>
</template>

<script setup>
import { logIn } from '../utils/auth'
import { useRouter } from 'vue-router'
import { ref } from 'vue'

const router = useRouter()

const user = ref({
  email: '',
  password: '',
})

async function handleLogIn() {
  const response = await logIn(user.value)
  if (response) {
    router.push('/')
  }
}
</script>

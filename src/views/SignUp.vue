<template>
  <div class="form-container">
    <div class="form-wrapper">
      <h3>Sign Up</h3>
      <form @submit.prevent="handleSignUp">
        <div class="form-group">
          <label>Name</label>
          <input
            v-model="user.name"
            type="text"
            class="form-control"
            id="name"
            placeholder="Name"
          />
        </div>
        <div class="form-group">
          <label>Email</label>

          <input
            v-model="user.email"
            type="email"
            class="form-control"
            id="email"
            placeholder="Email"
          />
        </div>

        <div class="form-group">
          <label>Password</label>
          <input
            v-model="user.password"
            type="password"
            class="form-control"
            id="password"
            placeholder="Password"
          />
        </div>
        <div class="form-group">
          <label>Confirm Password</label>
          <input
            v-model="user.password_confirm"
            type="password"
            class="form-control"
            id="confirm-password"
            placeholder="Confirm password"
          />
        </div>
        <button class="btn btn-primary">Create Account</button>
        <div class="error-message" v-if="msg.length > 0">
          <div v-for="m in msg" :key="m.id">
            <div>{{ m }}</div>
          </div>
        </div>
      </form>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import useAuth from '../composables/auth'

const user = {
  name: '',
  email: '',
  password: '',
  password_confirm: '',
}

const router = useRouter()

const msg = ref([])
// takes in form data and validates it
// returns empty array if no errors
// else returns array

function validateInput(data) {
  !data.name || !data.email || !data.password || !data.password_confirm
    ? msg.value.push('all fields are required')
    : msg

  data.password !== data.password_confirm
    ? msg.value.push('passwords must match')
    : msg
}

async function handleSignUp() {
  msg.value = []
  validateInput(user)
  if (msg.value.length > 0) {
    return
  } else {
    const response = await useAuth().signUp(user)
    if (!response.error) {
      router.push('/login')
    } else {
      msg.value.push(response.error)
    }
  }
}
</script>

<style>
.error-message {
  display: flex;
  flex-direction: column;
  align-items: left;
  gap: 10px;
  background-color: rgb(255, 255, 255);
  border: 1px solid red;
  color: crimson;
  margin-top: 10px;
  padding: 10px;
  position: absolute;
  border-radius: 4px;
}
</style>

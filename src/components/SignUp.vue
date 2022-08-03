<template>
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
      <br />
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
        placeholder="confirm-password"
      />
    </div>

    <button class="btn btn-primary">Create Account</button>
    <div v-for="m in msg" :key="m.id">
      <div>{{ m }}</div>
    </div>
  </form>
</template>

<script setup>
import axios from 'axios'
import { ref } from 'vue'
import { useRouter } from 'vue-router'

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
    const response = await axios
      .post('http://localhost:8000/signup', user)
      .catch((error) => {
        if (error.response.status === 400) {
          msg.value.push('this email is already taken try again')
        }
      })
    console.log(response)
  }

  if (msg.value.length > 0) {
    return
  } else {
    router.push('/login')
  }
}
</script>

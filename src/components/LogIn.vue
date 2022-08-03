<template>
  <div class="form-container">
    <div class="form-wrapper">
      <h3>Log In</h3>
      <form @submit.prevent="handleLogIn">
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
    </div>
  </div>
</template>

<script setup>
import useAuth from '../utils/auth'
import { useRouter } from 'vue-router'
import { ref } from 'vue'

const router = useRouter()

const user = ref({
  email: '',
  password: '',
})

async function handleLogIn() {
  const response = await useAuth().logIn(user.value)
  if (!response.error) {
    router.push('/')
  }
}
</script>

<style>
.form-container {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  height: 100vh;
  background-color: rgb(255, 255, 255);
}

.form-wrapper {
  border-radius: 8px;
  display: flex;
  width: 300px;
  flex-direction: column;
  justify-content: left;
  align-items: left;
  padding: 50px;
  gap: 20px;
  background: #ffffff;
  box-shadow: 0px 0px 20px rgba(0, 0, 0, 0.1);
}

.form-group {
  display: flex;
  flex-direction: column;
  order: 0;
  flex-grow: 0;
  font-family: Arial, Helvetica, sans-serif;
  font-style: normal;
  font-weight: 500;
  font-size: 14px;
  line-height: 17px;
  justify-content: left;
  margin: 10px 0px 10px 0px;
  gap: 10px;
  white-space: nowrap;
}
.btn {
  margin-top: 20px;
  width: 100%;
  border-radius: 4px;
  padding: 8px;
  background-color: #ffffff;
  box-shadow: 0px 0px 1px rgba(0, 0, 0, 0.9);
  border-radius: 4px;
  border: none;
  cursor: pointer;
}
label {
  width: auto;
  color: rgb(63, 63, 63);
}
input {
  display: block;
  align-self: right;
  width: 100%;
  border: 1px solid #d2d2d2;
  border-radius: 4px;
  padding: 2px 0px 2px 8px;
  box-sizing: border-box;
}

::placeholder {
  color: lightgray;
}
</style>

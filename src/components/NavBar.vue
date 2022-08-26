<template>
  <nav class="navbar">
    <div v-if="loggedIn" class="nav-item">
      <router-link to="/">Home</router-link>
    </div>
    <div v-if="!loggedIn" class="nav-item">
      <router-link to="/login">Log In</router-link>
    </div>
    <div v-if="!loggedIn" class="nav-item">
      <router-link to="/signup">Sign Up</router-link>
    </div>
    <div v-if="loggedIn" class="nav-item party-button">
      <router-link to="/party">Join the Party</router-link>
    </div>
    <div v-if="loggedIn" class="nav-item">
      <router-link to="/logout">Logout</router-link>
    </div>
    <div v-if="loggedIn" class="nav-item settings">
      <router-link to="/settings">Settings</router-link>
    </div>
  </nav>
</template>

<script setup>
import useAuth from '../composables/auth'

const { loggedIn } = useAuth()
</script>

<style>
.navbar {
  display: flex;
  flex-direction: row;
  align-items: flex-start;
  padding: 20px 40px 0px 40px;
  width: auto;
  height: auto;
  position: sticky;
  gap: 10px;
}

.nav-item {
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  padding: 4px 8px;
  gap: 10px;

  width: auto;
  height: 25px;

  background: #ffffff;

  font-family: Arial, Helvetica, sans-serif;
  font-style: normal;
  font-weight: 500;
  font-size: 14px;
  line-height: 17px;
}

.router-link-active {
  border-bottom: 1px solid darkblue;
  padding-bottom: 5px;
  transition: 500ms;
}

.party-button {
  background-color: rgb(255, 228, 152);
  border-radius: 8px;
}

.settings {
  margin-left: auto;
  background-color: rgb(214, 214, 214);
  border-radius: 8px;
  color: #575757;
}
</style>

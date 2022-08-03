<template>
  <nav class="navbar navbar-expand navbar-light fixed-top">
    <div class="container">
      <div class="collapse navbar-collapse">
        <div class="navbar-nav ml-auto">
          <div v-if="loggedIn" class="nav-item">
            <router-link to="/">Home</router-link>
          </div>
          <div v-if="!loggedIn" class="nav-item">
            <router-link to="/login">Log In</router-link>
          </div>
          <div v-if="!loggedIn" class="nav-item">
            <router-link to="/signup">Sign Up</router-link>
          </div>
          <div v-if="loggedIn" class="nav-item">
            <router-link to="/logout">Logout</router-link>
          </div>
        </div>
      </div>
    </div>
  </nav>
</template>

<script setup>
import useAuth from '../utils/auth'

const loggedIn = useAuth().loggedIn
</script>

<style>
.navbar {
  display: flex;
  flex-direction: row;
  align-items: flex-start;
  padding: 10px 0px 10px 20px;
  width: 100vw;
  height: auto;
  position: fixed;
}

.navbar-nav {
  display: flex;
  order: 0;
  align-self: stretch;
  flex-grow: 0;
  gap: 10px;
}

.nav-item {
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  padding: 4px 8px;
  gap: 10px;

  width: 56px;
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
</style>

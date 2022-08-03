<template>
  <div id="app">
    <NavBar />
    <div class="auth-wrapper">
      <div class="auth-inner">
        <router-view />
      </div>
    </div>
  </div>
</template>

<script setup>
import NavBar from './components/NavBar.vue'
</script>

<style>
* {
  margin: 0;
  text-decoration: none;
  font-family: Arial, Helvetica, sans-serif;
  font-style: normal;
}

a {
  color: rgb(0, 0, 0);
}
</style>

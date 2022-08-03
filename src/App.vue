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
}
</style>

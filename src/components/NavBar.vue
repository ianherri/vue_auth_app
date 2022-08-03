<template>
  <nav class="navbar navbar-expand navbar-light fixed-top">
    <div class="container">
      <router-link to="/">Home</router-link>
      <div class="collapse navbar-collapse">
        <ul class="navbar-nav ml-auto">
          <li class="nav-item">
            <router-link to="/login">Log In</router-link>
          </li>
          <li class="nav-item">
            <router-link to="/signup">Sign Up</router-link>
          </li>
          <li class="nav-item">
            <router-link to="/logout">Logout</router-link>
          </li>
        </ul>
      </div>
    </div>
  </nav>
</template>

<script setup></script>

<style>
.container {
  background-color: aqua;
  margin-bottom: 20px;
}
ul {
  list-style-type: none;
  margin: 0;
  padding: 0;
  overflow: hidden;
  background-color: #ffc4c4;
}
li {
  list-style-type: none;
  float: right;
  padding: 0px 10px 0px 0px;
}
</style>

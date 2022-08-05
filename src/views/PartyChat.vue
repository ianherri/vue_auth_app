<template>
  <div class="sticky-btn">
    <button @click.prevent="handleNewPost" class="btn shitpost-btn">
      new post
    </button>
  </div>
  <div class="party-page">
    <h3>Welcome to the party {{ user.name }}!</h3>
    <div class="party-container">
      <div v-for="message in messages" :key="message._id">
        <MessageComponent :message="message" />
      </div>
    </div>
  </div>
</template>

<script setup>
import useState from '../composables/state'
import useAuth from '../composables/auth'
import MessageComponent from '../components/MessageComponent.vue'

const { messages } = useState()
const { user } = useAuth()
</script>

<style>
.party-page {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-items: center;
  padding-top: 60px;
  margin: auto;
  gap: 20px;
  max-width: 400px;
}
.party-container {
  display: flex;
  flex-direction: column;
  flex-wrap: wrap;
  justify-content: center;
  align-items: center;
  max-width: 100%;
  height: auto;
  gap: 10px;
  background-color: rgb(255, 255, 255);
}

.shitpost-btn {
  width: auto;
  height: 50px;
  padding: 14px;
  border-radius: 50px;
  box-shadow: 0px 0px 20px rgba(0, 0, 0, 0.1);
}

.sticky-btn {
  position: fixed;
  right: 20px;
  bottom: 20px;
}
</style>

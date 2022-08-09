<template>
  <div v-if="loggedIn">
    <div class="add-message-modal">
      <div v-if="showAddMessage">
        <AddMessage :user="user" />
      </div>
    </div>
    <div class="sticky-btn">
      <button @click.prevent="handleNewPost" class="btn shitpost-btn">
        new post
      </button>
    </div>

    <div class="party-page">
      <h3>Welcome to the party {{ user.name }}!</h3>
      <div class="party-container">
        <div
          v-for="message in messages.filter(
            (message) => message.reply === false
          )"
          :key="message._id"
        >
          <MessageComponent :message="message" :user="user" />
        </div>
      </div>
    </div>
  </div>
  <div v-else>
    <LoginRedirect />
  </div>
</template>

<script setup>
import useState from '../composables/state'
import useAuth from '../composables/auth'
import MessageComponent from '../components/MessageComponent.vue'
import { ref } from 'vue'
import AddMessage from '@/components/AddMessage.vue'
import LoginRedirect from '@/components/LoginRedirect.vue'

const { messages } = useState()
const { user, loggedIn } = useAuth()

const showAddMessage = ref(false)

function handleNewPost() {
  showAddMessage.value = !showAddMessage.value
}
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

.add-message-modal {
  position: fixed;
  right: 20px;
  bottom: 100px;
}
</style>

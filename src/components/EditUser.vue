<template>
  <div>Change your profile settings below</div>

  <form @submit.prevent="handleUserEdit">
    <div class="form-group">
      <label>Name</label>
      <input
        v-model="editUser.name"
        type="text"
        class="form-control"
        id="name"
        placeholder="Name"
      />
    </div>
    <button class="btn">Submit</button>
    <div class="form-group"></div>

    <div class="error-message" v-if="msg.length > 0">
      <div v-for="m in msg" :key="m.id">
        <div>{{ m }}</div>
      </div>
    </div>
  </form>
</template>

<script setup>
import { defineProps, toRefs, ref } from 'vue'
import useAuth from '../composables/auth'

const props = defineProps({
  user: Object,
})

const { user } = toRefs(props)

const editUser = { ...user.value }

const msg = ref([])
// takes in form data and validates it
// returns empty array if no errors
// else returns array

function validateInput(data) {
  !data.name ? msg.value.push('all fields are required') : msg
}

async function handleUserEdit() {
  msg.value = []
  validateInput(editUser)
  if (msg.value.length > 0) {
    return
  } else {
    const response = await useAuth().editUser({ name: editUser.name })
    if (!response.error) {
      console.log(response)
    } else {
      msg.value.push(response.error)
    }
  }
}
</script>

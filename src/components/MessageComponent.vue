<template>
  <div class="message-wrapper">
    <div class="message" @click.prevent="handleMessageClick(message)">
      <h4 class="username-label">@ {{ message.username }}:</h4>
      <div>{{ message.text }}</div>
      <p class="sub-label time">
        posted at: {{ format(message.timestamp, 'YYYY-MM-DD HH:mm') }}
      </p>
      <p class="sub-label upvotes">
        this post upvoted {{ countUpVotes }} times
      </p>
    </div>
    <div class="reply-btn">
      <a @click.prevent="handleReply"><span class="icon"></span></a>
      <a @click.prevent="handleUpVote" class="upvote">upvote</a>
    </div>

    <div v-if="showReply">
      <AddReply :user="user" :parentId="message._id" />
    </div>
  </div>
</template>

<script setup>
import { defineProps, toRefs, ref, computed } from 'vue'
import { format } from 'date-format-parse'
import { useRouter } from 'vue-router'
import AddReply from './AddReply.vue'

const router = useRouter()
const localUpVotes = ref([])

const props = defineProps({
  message: Object,
  user: Object,
})
const { message, user } = toRefs(props)

const countUpVotes = computed(() => {
  console.log(message.value)
  console.log(localUpVotes.value.length)
  return message.value.upVotes.length + localUpVotes.value.length
})

const showReply = ref(false)

function handleMessageClick(message) {
  console.log(`howdy ${user.value.name}`)
  router.push(`/message/${message._id}`)
}

function handleReply() {
  console.log(`howdy ${user.value.name}`)
  showReply.value = !showReply.value
}

function handleUpVote() {
  localUpVotes.value.push({ messageId: message.value._id })
  console.log(localUpVotes.value)
}
</script>

<style>
.message-wrapper {
  border-radius: 8px;
  display: flex;
  flex-direction: column;
  flex-wrap: wrap;
  flex-grow: 0;
  padding: 20px;
  width: 250px;
  gap: 10px;
  background: #ffffff;
  box-shadow: 0px 0px 20px rgba(0, 0, 0, 0.1);
  transition: all 1000ms;
  cursor: pointer;
}
.message {
  display: flex;
  flex-direction: column;
  gap: 10px;
}

.sub-label {
  color: rgb(109, 109, 109);
  font-size: 10px;
}

.username-label {
  color: rgb(255, 187, 28);
}

.reply-btn {
  display: flex;
  flex-direction: row;
  width: 100%;
}
.icon {
  background-image: url('../assets/reply-icon.png');
  height: 12px;
  width: 12px;
  background-repeat: no-repeat;
  background-size: contain;
  display: flex;
  float: right;
}
.upvote {
  margin-left: auto;
  font-size: 10px;
}
</style>

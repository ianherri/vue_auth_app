<template>
  <h4>replies</h4>
  <div>
    {{ reply.text }}
  </div>
</template>

<script setup>
import { defineProps, toRefs } from 'vue'

const { reply } = toRefs(props)

const props = defineProps({
  reply: Object,
})
</script>

<template>
  <div :class="`${status === 'error' ? 'bg-red-600' : 'bg-green-400'} text-white w-screen h-10 flex items-center justify-center`">{{ responseText }}</div>
</template>

<script setup>

import { computed } from 'vue';
import { useBanner } from '@/composables/banner'

const { action, status } = useBanner()

const successText = computed(() => {
   switch (action.value) {
    case "delete":
      return "Success: Post was deleted"
    case "create":
      return "Success: Post was created"
    case "update": 
      return "Success: Post was updated"
    default:
      return "Loading..."
  }
})

const errorText = computed(() => {
   switch (action.value) {
    case "delete":
      return "Error: Post could not be deleted"
    case "create":
      return "Error: Post could not be created"
    case "update": 
      return "Error: Post could not be updated"
    default:
      return "Loading..."
  }
})

const responseText = computed(() => {
  return status.value === "error" ? errorText : successText
})

</script>
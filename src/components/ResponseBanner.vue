<template>
  <div :class="`${status === 'error' ? 'bg-red-600' : 'bg-green-400'} text-white w-screen h-10 flex items-center justify-center`">{{ responseText }}</div>
</template>

<script setup>

import { defineProps, computed } from 'vue';

const props = defineProps({
  action: {
    type: String,
  },
  status: {
    type: String
  },
  errorMessage: {
    type: String
  }
});

const successText = computed(() => {
   switch (props.action) {
    case "delete":
      return "Success: Post was deleted"
    case "create":
      return "Success: Post was created"
    default: 
      return "Success: Post was updated"
  }
})

const errorText = computed(() => {
   switch (props.action) {
    case "delete":
      return "Error: Post could not be deleted"
    case "create":
      return "Error: Post could not be created"
    default: 
      return "Error: Post could not be updated"
  }
})

const responseText = computed(() => {
  return props.status === "error" ? errorText : successText
})

</script>
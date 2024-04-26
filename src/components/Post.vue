<template>
  <form class="flex flex-col justify-center items-center text-gray-800 ">
    <h1 class="text-lg font-semibold mb-4">
      <label for="body-input" class="text-sm font-normal">Title</label>
      <input v-model="post.title" :disabled="!editing" :class="`${editing ? 'text-gray-800' : 'text-gray-500'} w-[540px] bg-gray-100 border border-gray-500 p-2`">
    </h1>
    <body>
      <label for="author-select" class="text-sm">Author</label>
      <select v-model="post.userId" name="authors" id="author-select" :class="`${editing ? 'text-gray-800' : 'text-gray-500'} w-[540px] bg-gray-100 border border-gray-500 p-2 mb-4`">
        <option :value="user.id" v-for="user, u in users" :key="u">
          {{ user.name }}
        </option>
      </select>
      <label for="body-input" class="text-sm">Body</label>
      <textarea id="body-input" v-model="post.body" :disabled="!editing" required :class="`${editing ? 'text-gray-800' : 'text-gray-500'} w-[540px] min-h-[180px] bg-gray-100 border border-gray-500 p-2`"></textarea>
    </body>
  </form>
  
</template>

<script setup>
  import { ref, defineProps } from 'vue';

  var users = ref([])

  fetch('https://jsonplaceholder.typicode.com/users/')
  .then(response => response.json())
  .then(data => users.value = data)

  const props = defineProps({
    post: {
      type: Object,
      required: false,
    },
    editing: {
      type: Boolean,
      required: true,
      default: false,
    },
  })


</script>

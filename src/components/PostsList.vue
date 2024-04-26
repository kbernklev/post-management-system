<template>
  <table class="w-full text-sm text-left text-gray-400">
    <thead class="text-xs uppercase bg-gray-700 text-gray-400">
      <tr class="text-left border-b-2 border-b-black">
        <th class="px-6 py-3">Title</th>
        <th class="px-6 py-3">Description</th>
        <th class="px-6 py-3">Author ID</th>
      </tr>
    </thead>
    <tbody>
      <tr class="border-b bg-gray-800 border-gray-700" v-for="post, p in posts" :key="p">
        <td class="px-6 py-4"><button @click="showPost(post.id)">{{post.title}}</button></td>
        <td class="px-6 py-4">{{truncateString(post.body)}}...</td>
        <td class="px-6 py-4">{{post.userId}}</td>
      </tr>
    </tbody>
  </table>
</template>

<script setup>
  import { defineProps } from 'vue';

  const props = defineProps({
    posts: {
      type: Array,
      required: true,
    },
  })

  const emit = defineEmits(["showPost"])

  function truncateString(s) {
    return s.length > 100 ? s.slice(0, 50) : s
  }

  function showPost(id) {
    emit("showPost", id)
  }
</script>

<template>
  <div class="flex flex-col justify-center items-center">
    <ResponseBanner v-if="bannerVisible" :action="action" :status="status"/>
    <div class="py-8 flex flex-col">
      <button @click="openNewPost" class="p-4 self-end mb-2 bg-white hover:bg-gray-100 text-gray-800 font-semibold py-2 px-4 border border-gray-400 rounded shadow">Create New Post</button>
      <PostsList :posts="posts" @show-post="showPost"/>
    </div>
    <PostPreview ref="postPreviewRef" @showBanner="showBanner"></PostPreview>
  </div>
</template>

<script setup>
import PostsList from './components/PostsList.vue';
import PostPreview from './components/PostPreview.vue';
import ResponseBanner from './components/ResponseBanner.vue'

import { ref } from 'vue';

var posts = ref([])
var bannerVisible = ref(false)
const postPreviewRef = ref()
var action = ref("update")
var status = ref("success")

function showPost(id) {
  postPreviewRef.value.getPostByID(id)
}

function openNewPost() {
  postPreviewRef.value.openModal('create')
}

fetch('https://jsonplaceholder.typicode.com/posts/')
  .then(response => response.json())
  .then(data => posts.value = data)

function showBanner(act, stat) {
  action.value = act
  status.value = stat
  bannerVisible.value = true
  setTimeout(() => {
    bannerVisible.value = false
  }, 3000);
}

</script>


<template>
  <div class="flex flex-col justify-center items-center">
    <ResponseBanner v-if="bannerVisible"/>
    <div class="py-8 flex flex-col">
      <button @click="open('create')" class="p-4 self-end mb-2 bg-white hover:bg-gray-100 text-gray-800 font-semibold py-2 px-4 border border-gray-400 rounded shadow">Create New Post</button>
      <PostsList :posts="posts" @show-post="showPost"/>
    </div>
    <PostPreview></PostPreview>
  </div>
</template>

<script setup>
import PostsList from './components/PostsList.vue';
import PostPreview from './components/PostPreview.vue';
import ResponseBanner from './components/ResponseBanner.vue'
import { useModal } from './composables/modal.js'
import { onMounted } from 'vue';
import { useUsers } from './composables/users';
import { usePosts } from './composables/posts';
import { useBanner } from './composables/banner';

const { open } = useModal()
const { getUsers } = useUsers()
const { getPosts, posts, getPostById } = usePosts()
const { bannerVisible } = useBanner()

onMounted(() => {
  getUsers()
  getPosts()
})

function showPost(id) {
  getPostById(id)
  open("preview")
}

</script>


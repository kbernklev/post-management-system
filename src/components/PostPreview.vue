<template>
  <div class="flex flex-col justify-center items-center">
    <Modal :editing="editing" :isOpen="isModalOpened" @modal-close="close" @editing="toggleEdit" @save-post="savePost" @delete-post="removePost">
      <template #content>
        <div>
          <Post :post="post" :editing="editing"/>
        </div>
      </template>
    </Modal>
  </div>
</template>

<script setup>
import Post from './Post.vue';
import Modal from './Modal.vue';
import { useModal } from '@/composables/modal.js'
import { usePosts } from '@/composables/posts';

const { currentAction, editing, isModalOpened, close } = useModal()
const { post, createPost, updatePost, deletePost } = usePosts()
 
function toggleEdit() {
  editing.value = !editing.value
}

function removePost() {
  close()
  deletePost()
}

function savePost() {
  close()
  currentAction.value === "create" ? createPost() : updatePost(post.value.id)
}

</script>


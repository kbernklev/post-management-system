<template>
  <div class="flex flex-col justify-center items-center">
    <Modal :editing="editing" :isOpen="isModalOpened" @modal-close="closeModal" @editing="toggleEdit" @save-post="savePost" @delete-post="deletePost">
      <template #content>
        <div>
          <Post :post="previewPost" :editing="editing"/>
        </div>
      </template>
    </Modal>
  </div>
</template>

<script setup>
import Post from './Post.vue';
import Modal from './Modal.vue';
import { ref, defineEmits, defineExpose } from 'vue';

const emit = defineEmits(["showBanner"])

var previewPost = ref({})
var currentAction = ref("preview")
var editing = ref(false)
const isModalOpened = ref(false)

function openModal(action) {
  currentAction.value = action
  if (action === "create") {
    previewPost.value = {}
    editing.value = true
  }
  isModalOpened.value = true
}

const closeModal = () => {
  isModalOpened.value = false
  editing.value = false
};

function toggleEdit() {
  editing.value = !editing.value
}

async function getPostByID(id) {
  await fetch(`https://jsonplaceholder.typicode.com/posts/${id}`)
  .then(response => response.json())
  .then(data => previewPost.value = data)
  openModal("preview")
}

function createPost() {
  closeModal()
  fetch('https://jsonplaceholder.typicode.com/posts', {
    method: 'POST',
    body: JSON.stringify({
      title: previewPost.value.title,
      body: previewPost.value.body,
      userId: previewPost.value.userId,
    }),
    headers: {
      'Content-type': 'application/json; charset=UTF-8',
    },
  })
  .then((response) => response.status === 201 ? emit("showBanner", "create", "success") : emit("showBanner", ("create", "error")))
}

function updatePost(id) {
  closeModal()
  fetch(`https://jsonplaceholder.typicode.com/posts/${id}`, {
    method: 'PUT',
    body: JSON.stringify({
      title: previewPost.value.title,
      body: previewPost.value.body,
      userId: previewPost.value.userId,
    }),
    headers: {
      'Content-type': 'application/json; charset=UTF-8',
    },
  })
  .then((response) => response.status === 200 ? emit("showBanner", "update", "success") : emit("showBanner", ("update", "error")))
}

function savePost() {
  currentAction.value === "create" ? createPost() : updatePost(previewPost.value.id)
}

function deletePost() {
  closeModal()
  fetch(`https://jsonplaceholder.typicode.com/posts/${previewPost.value.id}`, {
    method: 'DELETE',
  })
  .then(response => response.json())
  .then(data => Object.keys(data).length === 0 ? emit("showBanner", "delete", "success") : emit("showBanner", ("delete", "error")))
}

defineExpose({
  getPostByID,
  openModal
})

</script>


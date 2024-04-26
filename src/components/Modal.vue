<template>
  <div v-if="isOpen" class="modal-mask">
    <div class="modal-wrapper">
      <div class="modal-container flex flex-col justify-between" ref="target">
        <div class="modal-body">
          <div class="flex justify-end text-2xl">
              <button class="text-gray-500 hover:text-gray-800" @click="emit('modal-close')">x</button>
            </div>
          <slot name="content"> default content </slot>
        </div>
        <div class="flex justify-end">
          <slot name="footer">
            <div class="text-gray-200">
              <button v-if="!editing" class="bg-red-500 hover:bg-red-700 py-2 px-4 mr-2 rounded" @click="$emit('deletePost')">Delete Post</button>
              <button class="bg-blue-500 hover:bg-blue-700 py-2 px-4 rounded" @click="savePost">{{ editing ? "Save" : "Edit" }}</button>
            </div>
          </slot>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.modal-mask {
  position: fixed;
  z-index: 9998;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.5);
}
.modal-container {
  width: 600px;
  height: 500px;
  margin: 150px auto;
  padding: 20px 30px;
  background-color: #e5e7eb;
  border-radius: 8px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.33);
}

</style>

<script setup>
  import { defineProps, defineEmits, ref } from "vue";
  import {onClickOutside} from '@vueuse/core'

  const props = defineProps({
    isOpen: {
      type: Boolean,
    },
    editing: {
      type: Boolean
    },
  });

  function savePost() {
    emit("editing")
    if (props.editing) {
      emit("savePost")
    }
  }

  const emit = defineEmits(["modal-close", "editing", "savePost", "deletePost"]);

  const target = ref(null)
  onClickOutside(target, ()=>emit('modal-close'))


</script>
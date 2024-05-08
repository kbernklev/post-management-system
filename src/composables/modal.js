import { ref } from 'vue'
import { usePosts } from './posts'

const isModalOpened = ref(false)
const editing = ref(false)
const currentAction = ref("preview")

export function useModal() {
  
  const { post } = usePosts()

  function open(action) {
    currentAction.value = action
    if (action === "create") {
      post.value = {}
      editing.value = true
    }
    isModalOpened.value = true
  }

  function close() {
    isModalOpened.value = false
    editing.value = false
  }

  return { editing, currentAction, isModalOpened, open, close }

}

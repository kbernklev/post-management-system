import { ref } from 'vue'

const users = ref(null)

export function useUsers() {

  function getUsers() {
    fetch('https://jsonplaceholder.typicode.com/users/')
      .then(response => response.json())
      .then(data => users.value = data)
  }

  return { users, getUsers }

}

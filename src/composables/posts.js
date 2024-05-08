import { ref } from 'vue'
import { useBanner } from './banner'

const post = ref(null)

export function usePosts() {

  const posts = ref(null)
  const { showBanner } = useBanner()

  function getPosts() {
    fetch('https://jsonplaceholder.typicode.com/posts/')
    .then(response => response.json())
    .then(data => posts.value = data)
  }

  function getPostById(id) {
    post.value = null
    fetch(`https://jsonplaceholder.typicode.com/posts/${id}`)
    .then(response => response.json())
    .then(data => post.value = data)
  }

  function createPost() {
    fetch('https://jsonplaceholder.typicode.com/posts', {
      method: 'POST',
      body: JSON.stringify({
        title: post.value.title,
        body: post.value.body,
        userId: post.value.userId,
      }),
      headers: {
        'Content-type': 'application/json; charset=UTF-8',
      },
    })
    .then(
      (response) => response.status === 201 
        ? showBanner("create", "success")
        : showBanner("create", "error"))
  }

  function updatePost(id) {
    fetch(`https://jsonplaceholder.typicode.com/posts/${id}`, {
      method: 'PUT',
      body: JSON.stringify({
        title: post.value.title,
        body: post.value.body,
        userId: post.value.userId,
      }),
      headers: {
        'Content-type': 'application/json; charset=UTF-8',
      },
    })
    .then(
      (response) => response.status === 200 
        ? showBanner("update", "success")
        : showBanner("update", "error"))
  }

  function deletePost() {
    fetch(`https://jsonplaceholder.typicode.com/posts/${post.value.id}`, {
      method: 'DELETE',
    })
    .then(response => response.json())
    .then(
      data => Object.keys(data).length === 0 
        ? showBanner("delete", "success")
        : showBanner("delete", "error"))
  }

  return { posts, getPosts, post, getPostById, createPost, updatePost, deletePost }

}

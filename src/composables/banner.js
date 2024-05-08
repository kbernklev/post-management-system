import { ref } from 'vue'

const bannerVisible = ref(false)
const action = ref(null)
const status = ref(null)

export function useBanner() {

  function showBanner(a, s) {
    action.value = a
    action.status = s
    bannerVisible.value = true
    setTimeout(() => {
      bannerVisible.value = false
    }, 3000);
  }

  return { showBanner, bannerVisible, action, status }

}

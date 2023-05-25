import { defineStore } from 'pinia'
import { reactive } from 'vue'

export const useAuthenticationStore = defineStore('authentication', () => {
  const user = reactive({})
  return {
    user
  }
})

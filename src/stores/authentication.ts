import { defineStore } from 'pinia'
import { reactive } from 'vue'
import { signInWithPopup, GoogleAuthProvider } from 'firebase/auth'
import { auth } from '@/plugins/firebase'

export const useAuthenticationStore = defineStore('authentication', {
  state: () => ({
    user: reactive({})
  }),
  actions: {
    async signInWithGoogle() {
      try {
        const provider = new GoogleAuthProvider()
        const { user } = await signInWithPopup(auth, provider)
        this.user = user
      } catch (error) {
        console.error(error)
      }
    },
    signOut() {
      // Thực hiện đăng xuất tại đây
    }
  }
})

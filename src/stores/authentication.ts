import { defineStore } from 'pinia'
import { reactive } from 'vue'
import {
  signInWithPopup,
  GoogleAuthProvider,
  FacebookAuthProvider,
  signInWithEmailAndPassword
} from 'firebase/auth'
import { auth } from '@/plugins/firebase'
import { sendDataToServer } from '@/utils/authentication'

export const useAuthenticationStore = defineStore('authentication', {
  state: () => ({
    user: reactive({})
  }),
  actions: {
    async signInWithGoogle() {
      try {
        const provider = new GoogleAuthProvider()
        const result = await signInWithPopup(auth, provider)
        const userCredential = {
          name: result.user.displayName,
          email: result.user.providerData[0].email,
          email_verified: result.user.emailVerified,
          avatar: result.user.photoURL,
          provider: result.user.providerId,
          uid: result.user.uid
        }
        const response = await sendDataToServer(userCredential)
        console.log(response)
      } catch (error) {
        console.error(error)
      }
    },
    async signInWithFacebook() {
      try {
        const provider = new FacebookAuthProvider()
        const result = await signInWithPopup(auth, provider)
        const userCredential = {
          name: result.user.displayName,
          email: result.user.providerData[0].email,
          email_verified: result.user.emailVerified,
          avatar: result.user.photoURL,
          provider: result.user.providerId,
          uid: result.user.uid
        }
        const response = await sendDataToServer(userCredential)
        console.log(response)
      } catch (error) {
        console.error(error)
      }
    },
    async signInWithEmailAndPassword(email: string, password: string) {
      try {
        {
          const result = await signInWithEmailAndPassword(auth, email, password)
          const userCredential = {
            name: result.user.displayName,
            email: result.user.providerData[0].email,
            email_verified: result.user.emailVerified,
            avatar: result.user.photoURL,
            provider: result.user.providerId,
            uid: result.user.uid,
            password: password
          }
          const response = await sendDataToServer(userCredential)
        }
      } catch (error) {
        console.log(error)
      }
    },
    signOut() {
      // Thực hiện đăng xuất tại đây
    }
  }
})

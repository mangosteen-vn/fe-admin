import { defineStore } from 'pinia'
import {
  signInWithPopup,
  GoogleAuthProvider,
  FacebookAuthProvider,
  signInWithEmailAndPassword
} from 'firebase/auth'
import { auth } from '@/plugins/firebase'
import { sendDataToServer } from '@/utils/authentication'
import type { ResponseWithToken } from '@/types/ResponseWithToken'

// @ts-ignore
export const useAuthenticationStore = defineStore('authentication', {
  state: () => ({
    user: {}
  }),

  actions: {
    async signInWithGoogle(): Promise<void> {
      await this.signInWithProvider(new GoogleAuthProvider())
    },
    async signInWithFacebook(): Promise<void> {
      await this.signInWithProvider(new FacebookAuthProvider())
    },
    async signInWithProvider(provider: GoogleAuthProvider | FacebookAuthProvider): Promise<void> {
      try {
        const result = await signInWithPopup(auth, provider)
        const userCredential = this.getUserCredential(result)
        const response: ResponseWithToken = await sendDataToServer(userCredential)
        localStorage.setItem('accessToken', response.accessToken)
      } catch (error) {
        console.error(error)
      }
    },
    async signInWithEmailAndPassword(email: string, password: string): Promise<void> {
      try {
        const result = await signInWithEmailAndPassword(auth, email, password)
        const userCredential = this.getUserCredential(result, password)
        const response: ResponseWithToken = await sendDataToServer(userCredential)
        localStorage.setItem('accessToken', response.accessToken)
      } catch (error) {
        console.error(error)
      }
    },
    getUserCredential(result: any, password: string = '') {
      return {
        name: result.user.displayName,
        email: result.user.providerData[0].email,
        email_verified: result.user.emailVerified,
        avatar: result.user.photoURL,
        provider: result.user.providerData[0].providerId,
        uid: result.user.uid,
        password: password
      }
    },
    signOut() {
      localStorage.removeItem('accessToken')
    }
  }
})

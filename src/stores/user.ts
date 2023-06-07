import { defineStore } from 'pinia'
import { checkRole, fetchUserProfile } from '@/utils/authentication'
import type { User } from '@/types/User'

export const useUserStore = defineStore('user', {
  state: () => ({
    isAuthenticated: false,
    user: {},
    isAdmin: false
  }),
  getters: {
    getCurrentUser: (state) => state.user
  },
  actions: {
    async fetchUserProfile(): Promise<void> {
      try {
        const response: User | null = await fetchUserProfile()
        await this.checkRole()
        // @ts-ignore
        this.user = response.data[0]
        // @ts-ignore
        return response.data[0]
      } catch (e) {
        console.log(e)
      }
    },
    async checkRole(): Promise<void> {
      try {
        const response = await checkRole()
        this.isAdmin = response.isAdmin
        return response.isAdmin
      } catch (e) {
        console.log(e)
      }
    }
  }
})

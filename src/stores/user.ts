import { defineStore } from 'pinia'
import { checkRole, fetchUserProfile } from '@/utils/authentication'

// @ts-ignore
export const useUserStore = defineStore('user', {
  state: () => ({
    user: {},
    userRole: ''
  }),
  actions: {
    async fetchUserProfile(): Promise<void> {
      try {
        await this.checkRole()
        this.user = await fetchUserProfile()
      } catch (e) {
        console.log(e)
      }
    },
    async checkRole(): Promise<void> {
      try {
        const userRole = await checkRole()
        this.userRole = userRole
        return userRole
      } catch (e) {
        console.log(e)
      }
    }
  }
})

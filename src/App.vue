<template>
  <v-app>
    <v-main>
      <router-view />
    </v-main>
  </v-app>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import { useUserStore } from '@/stores/user'

export default defineComponent({
  name: 'App',
  setup() {
    const userStore = useUserStore()
    const isAuthenticated = userStore.isAuthenticated
    const accessToken = localStorage.getItem('accessToken')
    if (accessToken && !isAuthenticated) {
      userStore.fetchUserProfile()
    }
  },
  data() {
    return {
      //
    }
  }
})
</script>

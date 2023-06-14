<template>
  <hello-world />
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import HelloWorld from '../components/HelloWorld.vue'
import { useUserStore } from '@/stores/user'

export default defineComponent({
  name: 'HomeView',

  components: {
    HelloWorld
  },
  setup() {
    const userStore = useUserStore()
    const isAuthenticated = userStore.isAuthenticated
    const accessToken = localStorage.getItem('accessToken')
    if (accessToken && !isAuthenticated) {
      userStore.fetchUserProfile()
    }
  }
})
</script>

<script lang="ts">
import { defineComponent, onMounted, ref } from 'vue'
import Aside from '@/components/admin/aside/index.vue'
import Header from '@/components/admin/header/index.vue'
import { useUserStore } from '@/stores/user'

export default defineComponent({
  components: {
    Header,
    Aside
  },
  setup() {
    const userStore = useUserStore()
    const accessToken = ref(localStorage.getItem('accessToken'))
    const user = ref(null)
    onMounted(async () => {
      if (accessToken.value) {
        user.value = await userStore.fetchUserProfile()
      }
    })
    return {
      user
    }
  }
})
</script>

<template>
  <div class="admin-layout open">
    <Aside></Aside>
    <div class="layout-content-wrapper">
      <Header :user="user"></Header>
      <v-main>
        {{ user }}
        <router-view />
      </v-main>
    </div>
  </div>
</template>
<style lang="scss" scoped>
.admin-layout {
  height: 100%;
  background: rgb(var(--v-theme-background-custom));

  aside {
    position: fixed;
    top: 0;
    left: 0;
    height: 100%;
    background-color: var(--bs-white);
  }

  .layout-content-wrapper {
    .v-main {
      padding: 1rem 24px 1rem 24px;
      max-inline-size: 1440px;
      margin: auto;
    }
  }

  &.open {
    aside {
      width: 260px;
    }

    .layout-content-wrapper {
      padding-left: 260px;
      height: 100%;
    }
  }

  &.close {
    aside {
      width: 84px;
    }

    .layout-content-wrapper {
      padding-left: 84px;
      height: 100%;
    }
  }
}
</style>

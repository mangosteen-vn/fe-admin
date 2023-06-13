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
    const openAside = ref(true)
    onMounted(async () => {
      if (accessToken.value) {
        await userStore.fetchUserProfile()
      }
    })
    return {
      openAside
    }
  },
  methods: {
    handleOpenAsideUpdate(newValue) {
      this.openAside = newValue
    }
  }
})
</script>

<template>
  <div class="admin-layout" :class="{ open: openAside, close: !openAside }">
    <Aside></Aside>
    <div class="layout-content-wrapper">
      <Header :openAside="openAside" @update:openAside="handleOpenAsideUpdate"></Header>
      <v-main>
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
      transition: 0.4s;
    }

    .layout-content-wrapper {
      padding-left: 260px;
      height: 100%;
      transition: 0.4s;
    }
  }

  &.close {
    aside {
      width: 84px;
      transition: 0.4s;
    }

    .layout-content-wrapper {
      padding-left: 84px;
      height: 100%;
      transition: 0.4s;
    }
  }
}
</style>

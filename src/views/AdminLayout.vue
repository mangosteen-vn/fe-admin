<script lang="ts">
import { defineComponent, onMounted, ref, watch, watchEffect } from 'vue'
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
    const closeAside = ref(true || localStorage.getItem('closeAside'))
    const hoverAside = ref(true)

    const checkMobile = () => {
      closeAside.value = window.innerWidth <= 1300
    }

    onMounted(async () => {
      if (accessToken.value) {
        await userStore.fetchUserProfile()
      }
      checkMobile()
      window.addEventListener('resize', checkMobile)
    })

    return {
      closeAside,
      hoverAside
    }
  },

  methods: {
    handleOpenAsideUpdate(newValue) {
      this.closeAside = newValue
      if (window.innerWidth <= 1300) {
        const htmlElement = document.documentElement
        htmlElement.classList.add('overflow-hidden')
      }
      if (window.innerWidth >= 1300) {
        localStorage.setItem('closeAside', newValue)
      }
    },

    handleOverlayAsideClick() {
      this.closeAside = !this.closeAside
      if (window.innerWidth <= 1300) {
        const htmlElement = document.documentElement
        htmlElement.classList.remove('overflow-hidden')
      }
    },
    handleResize() {
      if (window.innerWidth > 1300) {
        this.closeAside = localStorage.getItem('closeAside') === 'true'
      }
    },
    changeData() {
      if (this.closeAside) {
        this.hoverAside = false
      }
    },
    resetData() {
      if (this.closeAside) {
        this.hoverAside = true
      }
    }
  },
  unmounted() {
    window.removeEventListener('resize', this.handleResize)
  },
  mounted() {
    if (window.innerWidth > 1300) {
      this.closeAside = localStorage.getItem('closeAside') === 'true'
    }
    window.addEventListener('resize', this.handleResize)
  }
})
</script>

<template>
  <div :class="{ close: closeAside, open: !closeAside }" class="admin-layout position-relative">
    <Aside
      :class="{ close: closeAside, open: !closeAside, hovered: !hoverAside }"
      @mouseover="changeData"
      @mouseleave="resetData"
    ></Aside>
    <div class="layout-content-wrapper">
      <Header :openAside="closeAside" @update:openAside="handleOpenAsideUpdate"></Header>
      <v-main>
        <router-view />
      </v-main>
    </div>
    <div class="mangosteen-overlay overlay overlay-aside" @click="handleOverlayAsideClick"></div>
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
    z-index: 20001;
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
      inline-size: 260px;
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

.overlay-aside {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.5);
  z-index: 999;
  opacity: 0;
  pointer-events: none;
  transition: opacity 0.3s;
  cursor: pointer;
}

$xs: 0;
$sm: 576px;
$md: 768px;
$lg: 992px;
$xl: 1200px;
$xll: 1300px;
$xxl: 1400px;
@media screen and (max-width: $xll) {
  .admin-layout {
    .layout-content-wrapper {
      padding-left: 0 !important;
    }

    aside {
      width: 260px;
      left: -260px;
    }

    &.open {
      aside {
        left: 0;
      }
      .overlay-aside {
        opacity: 1;
        pointer-events: auto;
      }
    }

    &.close {
      aside {
        width: 260px;
        left: -100%;
      }

      .overlay-aside {
        opacity: 0;
        pointer-events: none;
      }
    }
  }
}
</style>

<script lang="ts">
import { defineComponent } from 'vue'
import Aside from '@/components/admin/aside/index.vue'
import Header from "@/components/admin/header/index.vue";

export default defineComponent({
  components: {
      Header,
    Aside
  }
})
</script>
<template>
  <div class="admin-layout open">
    <aside>
      <Aside></Aside>
    </aside>

    <div class="layout-content-wrapper">
      <div class="layout-content-padding px-4 py-3 position-relative">
        <header>
            <Header></Header>
        </header>
        <v-main>
          <router-view />
        </v-main>
      </div>
    </div>
  </div>
</template>
<style lang="scss" scoped>
.admin-layout {
  height: 100%;
  background-color: var(--bs-secondary-bg);
  aside {
    position: fixed;
    top: 0;
    left: 0;
    height: 100%;
    background-color: var(--bs-white);
  }
  .v-main{
    padding-top: 1rem;
  }
  header{
    position: sticky;
    top: 1rem;
    right: 24px;
    left: 0 ;
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
  }
}
</style>

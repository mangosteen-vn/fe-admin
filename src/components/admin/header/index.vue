<script lang="ts">
import {defineComponent} from "vue";

export default defineComponent({
    name: 'Header'
})
</script>
<template>
  <div class="nav-bar">
      <div class="nav-bar-container d-flex align-items-center">
          <v-btn icon variant="text" density="comfortable">
              <template v-slot:default>
                  <img src="@/assets/images/header/menu.svg" alt="">
              </template>
          </v-btn>
          <v-btn icon variant="text" density="comfortable">
              <template v-slot:default>
                  <img src="@/assets/images/header/search.svg" alt="">
              </template>
          </v-btn>
      </div>
  </div>
</template>
<style lang="scss">
.nav-bar{
  background-color: var(--bs-white);
  border-radius: 6px;
  box-shadow: 0 2px 6px rgba(47, 43, 61,.14),0 0 transparent,0 0 transparent;
  &-container{
    padding: 0 24px;
    height: 64px;
  }
}
</style>

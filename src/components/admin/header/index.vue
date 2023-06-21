<script lang="ts">
import { defineComponent } from 'vue'
import UserDropdown from '@/components/admin/header/user-dropdown/index.vue'
import { useUserStore } from '@/stores/user'
import { onMounted } from 'vue'
import IconSearch from '@/components/icons/header/IconSearch.vue'
import IconMenu from '@/components/icons/header/IconMenu.vue'

export default defineComponent({
  name: 'Header',
  components: { IconMenu, IconSearch, UserDropdown },
  props: ['openAside'],
  methods: {
    toggleOpenAside() {
      this.$emit('update:openAside', !this.openAside)
    }
  }
})
</script>
<template>
  <header>
    <div class="nav-bar">
      <div class="nav-bar-container d-flex align-items-center justify-content-between">
        <div class="nav-bar__left">
          <v-btn class="me-1" density="comfortable" icon variant="text" @click="toggleOpenAside">
            <template v-slot:default>
              <IconMenu :openAside="openAside"></IconMenu>
            </template>
          </v-btn>
          <v-btn density="comfortable" icon variant="text">
            <template v-slot:default>
              <IconSearch></IconSearch>
            </template>
          </v-btn>
        </div>
        <div class="nav-bar__right">
          <UserDropdown></UserDropdown>
        </div>
      </div>
    </div>
  </header>
</template>
<style lang="scss">
header {
  position: sticky;
  inset-block-start: 0;
  padding: 16px 24px 0 24px;
  max-inline-size: 1440px;
  margin: auto;
  z-index: 99999;

  &:before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: -0.75rem;
    -webkit-backdrop-filter: blur(4px);
    backdrop-filter: blur(4px);
    background: linear-gradient(
      180deg,
      rgba(248, 247, 250, 70%) 44%,
      rgba(248, 247, 250, 43%) 73%,
      rgba(248, 247, 250, 0%)
    );
    z-index: -1;
    -webkit-mask: linear-gradient(black, black 18%, transparent 100%);
  }

  .nav-bar {
    background-color: var(--bs-white);
    border-radius: 6px;
    box-shadow: 0 2px 6px rgba(47, 43, 61, 0.14), 0 0 transparent, 0 0 transparent;

    &-container {
      padding: 0 24px;
      height: 64px;
    }
  }
}
</style>

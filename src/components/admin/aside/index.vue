<script lang="ts">
import {defineComponent} from 'vue'
import IconPinia from "@/components/icons/aside/IconPinia.vue";

export default defineComponent({
    name: 'Aside',
    components: {IconPinia}
})
</script>
<template>
    <aside class="aside">
        <a class="aside__logo d-flex align-items-center gap-3 text-decoration-none">
            <div class="aside__logo__icon">
                <IconPinia></IconPinia>
            </div>
            <h5 class="aside__logo__branch fw-bold mb-0 text-deep-purple-lighten-1">
                MangPlat
            </h5>
        </a>
        <div class="test">

        </div>
    </aside>
</template>
<style lang="scss" scoped>
.aside {
  background: var(--bs-white);
  box-shadow: 0 2px 6px rgba(47, 43, 61, 0.14), 0 0 transparent, 0 0 transparent;
  z-index: 9999;

  &__logo {
    margin: 0 14px;
    padding: 16px 12px;
  }

  &.close {
    .aside__logo__branch {
      width: 0;
      overflow: hidden;
      visibility: hidden;
      transition: 1s;
    }
  }

  .test {
    height: 38px;
    background-color: violet;
  }
}
</style>

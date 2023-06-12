<script lang="ts">
import { defineComponent } from 'vue'

export default defineComponent({
  name: 'Aside'
})
</script>
<template>
  <aside>
    <div class="aside-header">Logo</div>
  </aside>
</template>
<style lang="scss" scoped>
aside {
  background: var(--bs-white);
  box-shadow: 0 2px 6px rgba(47, 43, 61, 0.14), 0 0 transparent, 0 0 transparent;
}
</style>

<script lang="ts">
import { defineComponent } from 'vue'
import CollectionTable from '@/components/admin/product/config/collection/index.vue'

export default defineComponent({
  name: 'ConfigProduct',
  components: { CollectionTable }
})
</script>
<template>
  <div class="product-config-component">
    <div class="row row-cols-2 gap-4">
      <div class="col">
        <div class="config-item bg-white rounded-6 box-shadow-component">
          <div class="config-item__title p-4">
            <h6 class="mb-0 fw-semibold">Collections</h6>
          </div>
          <div class="config-item__body p-4">
            <CollectionTable></CollectionTable>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<style lang="scss" scoped>
.product-config-component {
  .config-item {
    &__title {
      color: rgba(var(--nav-link-inerhit));
      font-size: 18px;
      border-bottom: 1px solid rgba(231, 234, 243, 0.7);
      font-weight: 700;
    }
    &__body {
      padding-top: 21px !important;
    }
  }
}
</style>

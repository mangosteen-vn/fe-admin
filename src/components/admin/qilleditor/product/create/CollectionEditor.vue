<script>
import DangerAlert from '@/components/admin/alert/DangerAlert.vue'
import IconPlus from '@/components/icons/product/create/IconPlus.vue'
import IconSelect from '@/components/icons/product/create/IconSelect.vue'

export default {
  components: { IconSelect, IconPlus, DangerAlert },
  props: {
    labelFor: String,
    label: String,
    placeholder: String,
    required: Boolean,
    message: String,
    showAlert: Boolean
  },

  data() {
    return {
      currentContent: ''
    }
  },
  mounted() {
    this.currentContent = localStorage.getItem('productTitleUnsaved') || ''
  },
  methods: {
    validateNumber() {
      this.currentContent = this.currentContent.replace(/\D/g, '') // Loại bỏ tất cả các ký tự không phải số
    }
  },
  watch: {
    currentContent(newVal) {
      if (newVal.length > 255) {
        this.currentContent = newVal.slice(0, 255)
      }
      this.$emit('updateContent', this.currentContent)
      localStorage.setItem('productTitleUnsaved', this.currentContent)
    }
  }
}
</script>
<template>
  <div class="mangosteen-collection-editor">
    <label :for="labelFor" class="mangosteen-collection-editor__label form-label">
      {{ label }}</label>
    <v-select
        class="mangosteen-collection-editor__select h-40"
        variant="outlined"
        density="compact"
        append-inner-icon
    >
      <template v-slot:append-inner>
        <IconSelect></IconSelect>
      </template>
    </v-select>
  </div>
</template>
<style lang="scss" scoped>
.mangosteen-collection-editor {
  position: relative;
  &__label {
    margin-bottom: 4px;
    font-size: 14px;
    color: var(--bs-black);
    font-weight: 500;
  }
}
</style>

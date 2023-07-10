<script lang="ts" setup>
import DangerAlert from '@/components/admin/alert/DangerAlert.vue'
import { defineProps, onMounted, ref, watch, defineEmits } from 'vue'

const MAX_CONTENT_LENGTH = 255

const props: any = defineProps({
  labelFor: String,
  label: String,
  placeholder: String,
  required: Boolean,
  message: String,
  showAlert: Boolean
})

const currentContent = ref('')
const emit = defineEmits(['updateContent'])

onMounted(() => {
  currentContent.value = localStorage.getItem('productVendorUnsaved') || ''
})

watch(currentContent, (newValue: string) => {
  if (newValue.length > MAX_CONTENT_LENGTH) {
    currentContent.value = newValue.slice(0, MAX_CONTENT_LENGTH)
  }
  emit('updateContent', newValue)
  localStorage.setItem('productVendorUnsaved', newValue)
})
</script>
<template>
  <div class="mangosteen-vendor-editor">
    <label :for="labelFor" class="mangosteen-vendor-editor__label form-label">{{ label }}</label>
    <input
      v-model="currentContent"
      type="text"
      class="mangosteen-vendor-editor__input form-control"
      :id="labelFor"
      :placeholder="placeholder"
    />
    <DangerAlert class="mt-2" :message="message" :show="showAlert"></DangerAlert>
  </div>
</template>
<style lang="scss" scoped>
.mangosteen-vendor-editor {
  position: relative;
  &__label {
    margin-bottom: 4px;
    font-size: 14px;
    color: var(--bs-black);
    font-weight: 500;
  }
  &__input {
    height: 40px;
    box-shadow: none !important;
    color: rgba(var(--nav-link-inerhit), 0.78) !important;
    caret: rgba(var(--nav-link-inerhit), 0.78);
    border-color: var(--blue-grey-lighten-3);
    font-weight: 500;
    padding-right: 80px;
    border-radius: 6px !important;
    padding-left: 15px;
    &::placeholder {
      border-color: rgba(var(--nav-link-inerhit), 0.25);
      font-weight: 500;
      font-style: italic;
      transition: 0.4s;
      color: rgba(var(--nav-link-inerhit), 0.48);
    }
    &:hover {
      border-color: rgba(var(--nav-link-inerhit), 0.48);
    }
    &::after {
      content: '';
      box-shadow: 0 0 0.25rem 0.05rem rgba(105, 108, 255, 0.1) !important;
    }
    &:focus {
      box-shadow: 0 0 0.25rem 0.05rem rgba(105, 108, 255, 0.1) !important;
      border: 1px solid rgb(105, 108, 255);
      &::placeholder {
        padding-left: 2px;
        transition: 0.4s;
      }
    }
  }
}
</style>

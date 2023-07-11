<script lang="ts" setup>
import DangerAlert from '@/components/admin/alert/DangerAlert.vue'
import { computed, onMounted, ref, watch, defineEmits, defineProps } from 'vue'

const MAX_CONTENT_LENGTH = 255

const currentContent = ref('')

const emit = defineEmits(['updateContent'])

const props: any = defineProps({
  labelFor: String,
  label: {
    type: String,
    default: ''
  },
  placeholder: String,
  required: Boolean,
  labelRequired: {
    type: String,
    default: ''
  },
  messageValidate: {
    type: String,
    default: ''
  },
  showAlert: Boolean
})

const characterCount: number = computed(() => currentContent.value.length)

onMounted(() => {
  const productTitleUnsaved: string | null = localStorage.getItem('productTitleUnsaved')
  if (productTitleUnsaved) {
    currentContent.value = productTitleUnsaved
  }
})

watch(
  () => currentContent.value,
  (newValue: string) => {
    if (newValue.length > MAX_CONTENT_LENGTH) {
      currentContent.value = newValue.slice(0, MAX_CONTENT_LENGTH)
    }
    emit('updateContent', newValue)
    localStorage.setItem('productTitleUnsaved', newValue)
  }
)
</script>
<template>
  <div class="mangosteen-title-editor">
    <label :for="labelFor" class="mangosteen-title-editor__label form-label"
      >{{ label }}
      <span
        v-show="required"
        class="mangosteen-title-editor__label__required text-blue-grey-lighten-1"
        >{{ labelRequired }}</span
      ></label
    >
    <input
      v-model="currentContent"
      type="text"
      class="mangosteen-title-editor__input form-control"
      :id="labelFor"
      :placeholder="placeholder"
    />
    <div class="mangosteen-title-editor__count">{{ characterCount }}/255</div>
  </div>
  <DangerAlert class="mt-2" :message="messageValidate" :show="showAlert"></DangerAlert>
</template>
<style lang="scss" scoped>
.mangosteen-title-editor {
  position: relative;
  &__label {
    margin-bottom: 4px;
    font-size: 14px;
    color: var(--bs-black);
    font-weight: 500;
    &:first-letter {
      text-transform: uppercase;
    }
    &__required {
      text-transform: none;
    }
  }
  &__count {
    position: absolute;
    bottom: 9px;
    right: 12px;
    color: rgba(var(--nav-link-inerhit), 0.78) !important;
    font-size: 14px;
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

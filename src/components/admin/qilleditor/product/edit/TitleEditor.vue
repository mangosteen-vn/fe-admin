<script>
import DangerAlert from '@/components/admin/alert/DangerAlert.vue'

export default {
  components: { DangerAlert },
  props: {
    labelFor: String,
    label: String,
    placeholder: String,
    required: Boolean,
    message: String,
    showAlert: Boolean,
    value: String
  },

  data() {
    return {
      currentContent: ''
    }
  },
  computed: {
    characterCount() {
      return this.currentContent.length
    }
  },
  watch: {
    value(newVal) {
      this.currentContent = newVal
    },
    currentContent(newVal) {
      if (newVal.length > 255) {
        this.currentContent = newVal.slice(0, 255)
      }
      this.$emit('updateContent', this.currentContent)
    }
  }
}
</script>
<template>
  <div class="mangosteen-title-editor">
    <label :for="labelFor" class="mangosteen-title-editor__label form-label"
      >{{ label }} <span v-show="required" class="text-blue-grey-lighten-1">(Optional)</span></label
    >
    <input
      v-model="currentContent"
      type="text"
      class="mangosteen-title-editor__input form-control"
      :id="labelFor"
      :placeholder="placeholder"
    />
    <div class="mangosteen-title-editor__count">{{ characterCount }}/255</div>
    <DangerAlert class="mt-2" :message="message" :show="showAlert"></DangerAlert>
  </div>
</template>
<style lang="scss" scoped>
.mangosteen-title-editor {
  position: relative;
  &__label {
    margin-bottom: 4px;
    font-size: 14px;
    color: var(--bs-black);
    font-weight: 500;
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

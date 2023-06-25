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
    showAlert: Boolean
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
  mounted() {
    this.currentContent = localStorage.getItem('productSEOKeywordUnsaved') || ''
  },
  watch: {
    currentContent(newVal) {
      if (newVal.length > 255) {
        this.currentContent = newVal.slice(0, 255)
      }
      this.$emit('updateContent', this.currentContent)
      localStorage.setItem('productSEOKeywordUnsaved', this.currentContent)
    }
  }
}
</script>
<template>
  <div class="mangosteen-title-editor">
    <label :for="labelFor" class="mangosteen-title-editor__label form-label"
      >{{ label }} <span v-show="required" class="text-red-accent-3">*</span></label
    >
    <textarea
      v-model="currentContent"
      type="text"
      class="mangosteen-title-editor__input form-control"
      :id="labelFor"
      :placeholder="placeholder"
    ></textarea>
    <div class="mangosteen-title-editor__count">{{ characterCount }}/255</div>
    <DangerAlert class="mt-2" :message="message" :show="showAlert"></DangerAlert>
  </div>
</template>
<style lang="scss" scoped>
.mangosteen-title-editor {
  position: relative;
  &__label {
    //margin-bottom: 4px;
    font-size: 14px;
    color: rgba(var(--nav-link-inerhit), 0.78);
  }
  &__count {
    position: absolute;
    bottom: 9px;
    right: 12px;
    color: rgba(var(--nav-link-inerhit), 0.78) !important;
    font-size: 14px;
  }
  &__input {
    box-shadow: none !important;
    color: rgba(var(--nav-link-inerhit), 0.68) !important;
    caret: rgba(var(--nav-link-inerhit), 0.78);
    border-color: var(--blue-grey-lighten-3);
    font-weight: 500;
    padding-right: 80px;
    border-radius: 6px !important;
    height: 120px;
    padding-left: 15px;
    &::placeholder {
      border-color: rgba(var(--nav-link-inerhit), 0.25);
      font-weight: 500;
      transition: 0.4s;
      font-style: italic;
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
      border: 1px solid #696cff;
      &::placeholder {
        padding-left: 2px;
        transition: 0.4s;
      }
    }
  }
}
</style>

<script>
export default {
  props: {
    labelFor: {
      type: String
    },
    title: {
      type: String
    },
    placeholder: {
      type: String
    },
    value: {
      type: String
    },
    required: {
      type: Boolean
    }
  },
  data() {
    return {
      characterCount: 0,
      currentValue: this.value || ''
    }
  },
  methods: {
    countCharacters() {
      if (this.currentValue.length > 255) {
        this.currentValue = this.currentValue.slice(0, 255)
      }
      this.characterCount = this.currentValue.length
    }
  },
  watch: {
    currentValue(newVal) {
      this.$emit('changeValue', newVal)
    }
  }
}
</script>
<template>
  <div class="mangosteen-title-editor">
    <label :for="labelFor" class="mangosteen-title-editor__label form-label"
      >{{ title }} <span v-show="required" class="text-red-accent-3">*</span></label
    >
    <input
      v-model="currentValue"
      type="text"
      class="mangosteen-title-editor__input form-control"
      @input="countCharacters"
      :id="labelFor"
      :placeholder="placeholder"
      :required="required"
    />
    <div class="mangosteen-title-editor__count">{{ characterCount }}/255</div>
  </div>
</template>
<style lang="scss" scoped>
.mangosteen-title-editor {
  position: relative;
  &__label {
    margin-bottom: 4px;
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

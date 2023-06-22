<script>
import { QuillEditor } from '@vueup/vue-quill'
import '@vueup/vue-quill/dist/vue-quill.snow.css'

export default {
  components: {
    QuillEditor
  },
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
      options: {
        placeholder: this.placeholder || '',
        modules: {
        }
      },
      focused: false
    }
  },
  methods: {
    handleFocus() {
      this.focused = true
    },
    handleBlur() {
      this.focused = false
    }
  }
}
</script>
<template>
  <div class="mangosteen-content-editor" :class="{ focused: focused }">
    <label :for="labelFor" class="mangosteen-content-editor__label form-label"
      >{{ title }} <span v-show="required" class="text-red-accent-3">*</span></label
    >
    <QuillEditor @blur="handleBlur" @focus="handleFocus" theme="snow" :options="options" toolbar="full" />
  </div>
</template>
<style lang="scss">
.mangosteen-content-editor {
  &.focused {
    .ql-container {
      border-color: #696cff !important;
      box-shadow: 0 0 0.25rem 0.05rem rgba(105, 108, 255, 0.1) !important;
    }
    .ql-toolbar {
      border-color: #696cff !important;
    }
    .ql-editor {
      &.ql-blank {
        &::before {
          left: 17px !important;
          transition: 0.4s;
        }
      }
    }
  }
  &:hover {
    .ql-toolbar {
      border-color: rgba(var(--nav-link-inerhit), 0.48);
    }
    .ql-container {
      border-color: rgba(var(--nav-link-inerhit), 0.48);
    }
  }
  position: relative;
  &__label {
    margin-bottom: 4px;
    font-size: 14px;
    color: rgba(var(--nav-link-inerhit), 0.78);
  }
  .ql-toolbar {
    border: 1px solid var(--blue-grey-lighten-3);
    border-top-left-radius: 6px;
    border-top-right-radius: 6px;
  }
  .ql-container {
    font-family: 'Quicksand', sans-serif !important;
    font-size: 16px;
    height: 200px;
    color: rgba(var(--nav-link-inerhit), 0.78);
    border: 1px solid var(--blue-grey-lighten-3);
    border-top-width: 0 !important;
    border-bottom-left-radius: 6px;
    border-bottom-right-radius: 6px;
    font-weight: 500;
    .ql-editor {
      &.ql-blank {
        &::before {
          transition: 0.4s;
        }
      }
    }
  }
}
</style>

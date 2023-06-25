<script>
import { QuillEditor } from '@vueup/vue-quill'
import '@vueup/vue-quill/dist/vue-quill.snow.css'
import BlotFormatter from 'quill-blot-formatter'
import DangerAlert from '@/components/admin/alert/DangerAlert.vue'

export default {
  components: {
    DangerAlert,
    QuillEditor
  },
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
      options: {
        placeholder: this.placeholder || '',
        modules: {
          toolbar: [
            ['bold', 'italic', 'underline'],
            [{ list: 'ordered' }, { list: 'bullet' }],
            [{ indent: '-1' }, { indent: '+1' }],
            ['clean']
          ]
        }
      },
      focused: false,
      content: null
    }
  },
  setup: () => {
    const modules = [
      {
        name: 'blotFormatter',
        module: BlotFormatter,
        options: {
          /* options */
        }
      }
    ]
    return { modules }
  },
  methods: {
    handleFocus() {
      this.focused = true
    },
    handleBlur() {
      this.focused = false
    },
    handleUpdateContent(newContent) {
      this.$emit('updateContent', newContent)
      localStorage.setItem('productDescriptionUnsaved', newContent)
    }
  },
  mounted() {
    const contentUnsaved = localStorage.getItem('productDescriptionUnsaved')
    if (contentUnsaved) {
      this.content = contentUnsaved
    }
  }
}
</script>
<template>
  <div class="mangosteen-description-details-editor" :class="{ focused: focused }">
    <label :for="labelFor" class="mangosteen-description-details-editor__label form-label"
      >{{ label }} <span v-show="required" class="text-red-accent-3">*</span></label
    >
    <QuillEditor
      v-model:content="content"
      :modules="modules"
      :options="options"
      contentType="html"
      theme="snow"
      @blur="handleBlur"
      @focus="handleFocus"
      @update:content="handleUpdateContent"
    />
    <DangerAlert :id="labelFor" :message="message" :show="showAlert" class="mt-2"></DangerAlert>
  </div>
</template>
<style lang="scss">
.mangosteen-description-details-editor {
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
          color: rgba(var(--nav-link-inerhit), 0.48);
        }
      }
    }
  }
}
</style>

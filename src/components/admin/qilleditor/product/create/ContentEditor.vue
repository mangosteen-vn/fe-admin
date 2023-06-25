<script>
import { QuillEditor } from '@vueup/vue-quill'
import '@vueup/vue-quill/dist/vue-quill.snow.css'
import BlotFormatter from 'quill-blot-formatter'
import Autoformat from 'quill-autoformat/src/modules/autoformat'
import ImageCompress from 'quill-image-compress'
import { ImageDrop } from 'quill-image-drop-module'
import MagicUrl from 'quill-magic-url'
import MarkdownShortcuts from 'quill-markdown-shortcuts'
import ImageUploader from 'quill-image-uploader'
import { uploadImage } from '@/utils/file'
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
          toolbar: [['markdown']]
        }
      },
      content: null,
      focused: false
    }
  },
  mounted() {
    const contentUnsaved = localStorage.getItem('productContentUnsaved')
    if (contentUnsaved) {
      this.content = contentUnsaved
    }
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
      localStorage.setItem('productContentUnsaved', newContent)
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
      },

      {
        name: 'autoFormat',
        module: Autoformat,
        options: {
          /* options */
        }
      },
      {
        name: 'imageCompress',
        module: ImageCompress,
        options: {
          /* options */
        }
      },
      {
        name: 'imageDrop',
        module: ImageDrop,
        options: {
          /* options */
        }
      },
      {
        name: 'magicUrl',
        module: MagicUrl,
        options: {
          /* options */
        }
      },
      {
        name: 'markdownShortcuts',
        module: MarkdownShortcuts,
        options: {
          /* options */
        }
      },
      {
        name: 'imageUploader',
        module: ImageUploader,
        options: {
          upload: (file) => {
            return new Promise((resolve, reject) => {
              const formData = new FormData()
              formData.append('image', file)
              console.log(formData)
              uploadImage(formData)
                .then((webpPath) => {
                  resolve(webpPath)
                })
                .catch((error) => {
                  reject('Upload failed')
                  console.error('Error:', error)
                })
            })
          }
        }
      }
    ]
    return { modules }
  }
}
</script>
<template>
  <div class="mangosteen-content-editor" :class="{ focused: focused }">
    <label :for="labelFor" class="mangosteen-content-editor__label form-label"
      >{{ label }} <span v-show="required" class="text-red-accent-3">*</span></label
    >
    <QuillEditor
      @blur="handleBlur"
      @focus="handleFocus"
      theme="snow"
      v-model:content="content"
      @update:content="handleUpdateContent"
      :modules="modules"
      :options="options"
      contentType="html"
      toolbar="full"
    />
    <DangerAlert :id="labelFor" :message="message" :show="showAlert" class="mt-2"></DangerAlert>
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
    height: 600px;
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

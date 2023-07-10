<script lang="ts" setup>
import { defineComponent, onMounted, ref, defineProps, reactive, defineEmits } from 'vue'
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

const props = defineProps({
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

const emit = defineEmits(['updateContent'])

const content = ref<string | null>(null)
const focused = ref(false)

const options = reactive({
  placeholder: props.placeholder || '',
  modules: {
    toolbar: [['markdown']]
  }
})

const handleFocus = () => {
  focused.value = true
}

const handleBlur = () => {
  focused.value = false
}

onMounted(() => {
  const contentUnsaved: string | null = localStorage.getItem('productContentUnsaved')
  if (contentUnsaved) {
    content.value = contentUnsaved
  }
})

const handleUpdateContent = (newContent: string) => {
  emit('updateContent', newContent)
  localStorage.setItem('productContentUnsaved', newContent)
}

const modules = reactive(
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
      upload: (file: File) => {
        return new Promise<string>((resolve, reject) => {
          const formData = new FormData()
          formData.append('image', file)
          console.log(formData)
          uploadImage(formData)
            .then((webpPath: string) => {
              resolve(webpPath)
            })
            .catch((error: Error) => {
              reject('Upload failed')
              console.error('Error:', error)
            })
        })
      }
    }
  }
)
</script>

<template>
  <div :class="{ focused: focused }" class="mangosteen-content-editor">
    <label :for="labelFor" class="mangosteen-content-editor__label form-label text-capitalize">
      {{ label }}
      <span v-show="required" class="text-blue-grey-lighten-1">{{ labelRequired }}</span>
    </label>
    <QuillEditor
      v-model:content="content"
      :modules="modules"
      :options="options"
      contentType="html"
      theme="snow"
      toolbar="full"
      @blur="handleBlur"
      @focus="handleFocus"
      @update:content="handleUpdateContent"
    />
    <DangerAlert
      :id="labelFor"
      :message="messageValidate"
      :show="showAlert"
      class="mt-2"
    ></DangerAlert>
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
    margin-bottom: 4px !important;
    font-size: 14px;
    color: var(--bs-black);
    font-weight: 500;
  }
  .ql-toolbar {
    border: 1px solid var(--blue-grey-lighten-3);
    border-top-left-radius: 6px;
    border-top-right-radius: 6px;
  }
  .ql-container {
    font-family: 'Quicksand', sans-serif !important;
    font-size: 16px;
    height: 500px;
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

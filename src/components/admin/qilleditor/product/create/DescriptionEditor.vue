<script lang="ts" setup>
import { QuillEditor } from '@vueup/vue-quill'
import '@vueup/vue-quill/dist/vue-quill.snow.css'
import BlotFormatter from 'quill-blot-formatter'
import DangerAlert from '@/components/admin/alert/DangerAlert.vue'

import { defineProps, onMounted, reactive, ref, defineEmits, watch } from 'vue'

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

const emit = defineEmits(['updateContent'])

const options = reactive({
  placeholder: props.placeholder || '',
  modules: {
    toolbar: [
      ['bold', 'italic', 'underline'],
      [{ list: 'ordered' }, { list: 'bullet' }],
      [{ indent: '-1' }, { indent: '+1' }],
      ['clean']
    ]
  }
})
const modules = reactive({
  name: 'blotFormatter',
  module: BlotFormatter,
  options: {
    /* options */
  }
})

const focused = ref(false)
const content = ref('')

const handleFocus = () => {
  focused.value = true
}

const handleBlur = () => {
  focused.value = false
}

watch(content, (newValue: string) => {
  emit('updateContent', newValue)
  localStorage.setItem('productDescriptionUnsaved', newValue)
})

onMounted(() => {
  const productDescriptionUnsaved: string | null = localStorage.getItem('productDescriptionUnsaved')
  if (productDescriptionUnsaved) {
    content.value = productDescriptionUnsaved
  }
})
</script>
<template>
  <div class="mangosteen-description-details-editor" :class="{ focused: focused }">
    <label
      :for="labelFor"
      class="mangosteen-description-details-editor__label form-label text-capitalize"
      >{{ label }}
      <span v-show="required" class="text-blue-grey-lighten-1">{{ labelRequired }}</span></label
    >
    <QuillEditor
      v-model:content="content"
      :modules="modules"
      :options="options"
      contentType="html"
      theme="snow"
      @blur="handleBlur"
      @focus="handleFocus"
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
    height: 250px;
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

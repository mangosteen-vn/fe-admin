<script lang="ts">
import { defineComponent, ref, watch } from 'vue'
import IconUpload from '@/components/icons/editor/IconUpload.vue'
import IconDelete from '@/components/icons/editor/IconDelete.vue'
import IconView from '@/components/icons/editor/IconView.vue'
import { uploadImage } from '@/utils/file'

export default defineComponent({
  components: { IconView, IconDelete, IconUpload },
  props: {
    value: String
  },
  setup(props: any) {
    const webpPath = ref<string | null>(null)

    watch(
      () => props.value,
      (newVal: null) => {
        if (newVal !== null) {
          webpPath.value = newVal
        }
      }
    )

    return {
      webpPath
    }
  },
  methods: {
    async uploadImage(event: { target: { files: any[] } }) {
      const file = event.target.files[0]
      const formData = new FormData()
      formData.append('image', file)
      this.webpPath = await uploadImage(formData)
    },
    handleDelete() {
      this.webpPath = null
    }
  }
})
</script>

<template>
  <div class="mangosteen-thumbnail-editor">
    <label class="mangosteen-thumbnail-editor__label"> Thumbnail </label>
    <div class="d-flex">
      <div v-if="webpPath" class="mangosteen-thumbnail-editor__img me-3 ratio ratio-1x1 p-1">
        <img :src="webpPath" class="base64-img img-thumbnail object-fit-cover" />
        <div
          class="mangosteen-thumbnail-editor__img__action d-flex align-items-center justify-content-center"
        >
          <IconView class="icon-stroke-white me-1"></IconView>
          <IconDelete class="icon-delete" @click="handleDelete"></IconDelete>
        </div>
      </div>
      <div
        class="mangosteen-thumbnail-editor__upload d-flex align-items-center justify-content-center"
      >
        <IconUpload class="mangosteen-thumbnail-editor__upload__icon"> </IconUpload>
        <input class="w-100 h-100" ref="fileInput" type="file" @change="uploadImage" />
      </div>
    </div>
  </div>
</template>
<style lang="scss" scoped>
.mangosteen-thumbnail-editor {
  &__label {
    margin-bottom: 4px !important;
    font-size: 14px;
    color: var(--bs-black);
    font-weight: 500;
  }

  &__img {
    height: 130px;
    width: 130px;
    display: block;
    border-radius: 6px;

    &::before {
      transition: 0.4s;
    }

    &:hover {
      &::before {
        background-color: rgba(0, 0, 0, 0.5);
        position: relative;
        z-index: 2;
        transition: 0.4s;
      }
      .mangosteen-thumbnail-editor__img__action {
        opacity: 1;
        visibility: visible;
      }

      .img-thumbnail {
        border-color: #696cff;
        transition: 0.4s;
      }
    }

    .img-thumbnail {
      border-color: var(--blue-grey-lighten-3);
      border-radius: 6px;
      border-style: dashed;
      transition: 0.4s;
    }

    &__action {
      border-radius: 6px;
      position: absolute;
      opacity: 0;
      visibility: hidden;
      z-index: 3;
      .icon-stroke-white {
        stroke: var(--bs-white);
        cursor: pointer;
      }
      .icon-delete {
        stroke: var(--bs-danger);
        cursor: pointer;
      }
    }
  }

  &__upload {
    height: 130px;
    width: 130px;
    cursor: pointer;
    border-radius: 6px;
    border: 1px dashed var(--blue-grey-lighten-3);

    &:hover {
      border-color: #696cff;
      transition: 0.4s;

      svg {
        stroke: #696cff;
      }
    }

    &__icon {
      position: absolute;
    }

    input {
      opacity: 0;
      cursor: pointer;
    }
  }
}
</style>

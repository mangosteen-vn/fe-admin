<script lang="ts">
import IconUpload from '@/components/icons/editor/IconUpload.vue'
import IconDelete from '@/components/icons/editor/IconDelete.vue'
import IconView from '@/components/icons/editor/IconView.vue'
import { uploadImage } from '@/utils/file'

export default {
  components: { IconView, IconDelete, IconUpload },
  props: {
    src: {
      type: String
    }
  },
  data(): any {
    return {
      webpPaths: []
    }
  },
  mounted() {
    const savedWebpPaths = localStorage.getItem('productGalleryUnsaved')
    if (savedWebpPaths) {
      this.webpPaths = JSON.parse(savedWebpPaths)
    }
  },
  methods: {
    async uploadImage(event: { target: { files: any[] } }) {
      const files = event.target.files
      for (let i = 0; i < files.length; i++) {
        const file = files[i]
        const formData = new FormData()
        formData.append('image', file)
        const webpPath = await uploadImage(formData)
        this.webpPaths.push(webpPath)
      }
      localStorage.setItem('productGalleryUnsaved', JSON.stringify(this.webpPaths))
    },
    handleDelete(index) {
      this.webpPaths.splice(index, 1)
      localStorage.setItem('productGalleryUnsaved', JSON.stringify(this.webpPaths))
    }
  }
}
</script>
<template>
  <div class="mangosteen-gallery-editor">
    <label class="mangosteen-gallery-editor__label"> Gallery Image </label>
    <div class="d-flex flex-wrap gap-3">
      <div
        v-for="(image, index) in webpPaths"
        :key="index"
        class="mangosteen-gallery-editor__img ratio ratio-1x1 p-1"
      >
        <img :src="image" class="base64-img img-thumbnail object-fit-cover" />
        <div
          class="mangosteen-gallery-editor__img__action d-flex align-items-center justify-content-center"
        >
          <IconView class="icon-stroke-white me-1"></IconView>
          <IconDelete class="icon-delete" @click="handleDelete(index)"></IconDelete>
        </div>
      </div>
      <div
        class="mangosteen-gallery-editor__upload d-flex align-items-center justify-content-center"
      >
        <IconUpload class="mangosteen-gallery-editor__upload__icon"> </IconUpload>
        <input class="w-100 h-100" type="file" multiple @change="uploadImage" />
      </div>
    </div>
  </div>
</template>
<style lang="scss" scoped>
.mangosteen-gallery-editor {
  &__label {
    margin-bottom: 4px;
    font-size: 14px;
    color: rgba(var(--nav-link-inerhit), 0.78);
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
      .mangosteen-gallery-editor__img__action {
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

<script>
import TitleEditor from '@/components/admin/qilleditor/product/create/TitleEditor.vue'
import SeoEditor from '@/components/admin/qilleditor/product/create/SeoEditor.vue'
import DescriptionEditor from '@/components/admin/qilleditor/product/create/DescriptionEditor.vue'
import ContentEditor from '@/components/admin/qilleditor/product/create/ContentEditor.vue'
import ThumbnailEditor from '@/components/admin/qilleditor/product/create/ThumbnailEditor.vue'
import GalleryEditor from '@/components/admin/qilleditor/product/create/GalleryEditor.vue'
import IconPlus from '@/components/icons/product/create/IconPlus.vue'
import { reactive } from 'vue'
import router from '@/router'

export default {
  name: 'DashboardView',
  components: {
    IconPlus,
    GalleryEditor,
    ThumbnailEditor,
    ContentEditor,
    DescriptionEditor,
    SeoEditor,
    TitleEditor
  },
  methods: {
    handleChangeTitle(newVal) {
      this.data.title.value = newVal
    },
    handleChangeSEOKeyword(newVal) {
      this.data.SEOKeyword.value = newVal
    },
    handleUpdateDescription(newVal) {
      this.data.description.value = newVal
      console.log(newVal)
    },
    handleChangeContent(newVal) {
      this.data.content.value = newVal
    },
    scrollToElement(id) {
      const element = document.getElementById(id)
      if (element) {
        const offset = element.offsetTop - 300 // Khoảng cách 200px
        window.scrollTo({ top: offset, behavior: 'smooth' })
      }
    },
    isValidQuillContent(value) {
      const regex = /(<([^>]+)>)/gi
      const text = value.replace(regex, '').trim()
      return !!text.length
    },
    createProduct() {
      let isValid = true

      Object.values(this.data).forEach((property) => {
        if (property.required && property.value === '') {
          property.showAlert = true
          isValid = false
          this.scrollToElement(property.id)
        } else if (property.type === 'quillEditor') {
          const isQuillContentValid = this.isValidQuillContent(property.value)
          property.showAlert = !isQuillContentValid
          isValid = isValid && isQuillContentValid
          if (!isValid) {
            this.scrollToElement(property.id)
          }
        } else {
          property.showAlert = false
        }
      })

      if (isValid) {
        localStorage.removeItem('productDescriptionUnsaved')
        localStorage.removeItem('productSEOKeywordUnsaved')
        localStorage.removeItem('productTitleUnsaved')
        localStorage.removeItem('productContentUnsaved')
        localStorage.removeItem('productThumbnailUnsaved')
        localStorage.removeItem('productGalleryUnsaved')
        router.push('/admin/product/list')
      }
    }
  },
  setup() {
    const data = reactive({
      title: {
        id: 'productTitle',
        label: 'Product Name',
        value: '',
        required: true,
        placeholder: 'Enter the product name ...',
        showAlert: false,
        messageValidate: 'Product Name must be filled'
      },
      SEOKeyword: {
        id: 'productSEOKeyword',
        label: 'SEO Keyword',
        value: '',
        required: true,
        placeholder: 'Enter the product SEO Keyword ...',
        showAlert: false,
        messageValidate: 'SEO Keyword must be filled'
      },
      description: {
        id: 'productDescription',
        label: 'Product Description',
        value: '',
        required: true,
        placeholder: 'Enter the product description ...',
        showAlert: false,
        messageValidate: 'Product Description must be filled',
        type: 'quillEditor'
      },
      content: {
        id: 'productContent',
        label: 'Product Content',
        value: '',
        required: true,
        placeholder: 'Enter the product content ...',
        showAlert: false,
        messageValidate: 'Product Content must be filled',
        type: 'quillEditor'
      }
    })
    return {
      data
    }
  }
}
</script>
<template>
  <div class="create-product-component p-4 bg-white rounded-6 box-shadow-component">
    <div class="create-product-component__title mb-4">
      <h5 class="mb-0">Create Product</h5>
    </div>
    <form @submit.prevent="createProduct" class="create-product-component__form">
      <div class="row row-cols-lg-2 row-cols-1">
        <div class="col">
          <ThumbnailEditor></ThumbnailEditor>
          <GalleryEditor class="mt-4"></GalleryEditor>
        </div>
        <div class="col">
          <TitleEditor
            class="mt-4 mt-lg-0"
            :labelFor="data.title.id"
            :placeholder="data.title.placeholder"
            :label="data.title.label"
            :required="data.title.required"
            :message="data.title.messageValidate"
            :showAlert="data.title.showAlert"
            @updateContent="handleChangeTitle"
          ></TitleEditor>
          <SeoEditor
            :placeholder="'Enter the product SEO Keyword'"
            :labelFor="data.SEOKeyword.id"
            :label="data.SEOKeyword.label"
            :message="data.SEOKeyword.messageValidate"
            :showAlert="data.SEOKeyword.showAlert"
            class="mt-4"
            :required="data.SEOKeyword.required"
            @updateContent="handleChangeSEOKeyword"
          ></SeoEditor>
          <DescriptionEditor
            :labelFor="data.description.id"
            :label="data.description.label"
            :message="data.description.messageValidate"
            :showAlert="data.description.showAlert"
            :required="data.description.required"
            @updateContent="handleUpdateDescription"
            class="mt-4"
          ></DescriptionEditor>
        </div>
      </div>
      <ContentEditor
        @updateContent="handleChangeContent"
        :labelFor="data.content.id"
        :label="data.content.label"
        :message="data.content.messageValidate"
        :showAlert="data.content.showAlert"
        :required="data.content.required"
        class="mt-4"
      ></ContentEditor>
      <div class="create-product-component__form__action d-flex gap-3">
        <div class="btn-primary--flat mt-3">
          <v-btn
            class="text-none rounded-6"
            color="purple-accent-4"
            prepend-icon
            type="submit"
            variant="flat"
          >
            <template v-slot:prepend>
              <IconPlus></IconPlus>
            </template>
            Create New Product
          </v-btn>
        </div>
        <div class="btn-primary--flat mt-3">
          <v-btn class="text-none rounded-6" color="purple-accent-4" type="submit" variant="flat">
            Reset
          </v-btn>
        </div>
      </div>
    </form>
  </div>
</template>
<style lang="scss" scoped>
.create-product-component {
}
</style>

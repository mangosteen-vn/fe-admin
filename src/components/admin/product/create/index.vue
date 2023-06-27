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
import OriginalPriceEditor from '@/components/admin/qilleditor/product/create/OriginalPriceEditor.vue'
import CurrentPriceEditor from '@/components/admin/qilleditor/product/create/CurrentPriceEditor.vue'
import VendorEditor from '@/components/admin/qilleditor/product/create/VendorEditor.vue'
import CollectionEditor from '@/components/admin/qilleditor/product/create/CollectionEditor.vue'

export default {
  name: 'DashboardView',
  components: {
    CollectionEditor,
    VendorEditor,
    CurrentPriceEditor,
    OriginalPriceEditor,
    GalleryEditor,
    ThumbnailEditor,
    ContentEditor,
    DescriptionEditor,
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
      },
      originalPrice: {
        id: 'productOriginalPrice',
        label: 'Original Price',
        value: '',
        required: false,
        placeholder: '120000',
        showAlert: false,
        messageValidate: 'None'
      },
      currentPrice: {
        id: 'productCurrentPrice',
        label: 'Current Price',
        value: '',
        required: false,
        placeholder: '100000',
        showAlert: false,
        messageValidate: 'None'
      },
      vendor: {
        id: 'productVendor',
        label: 'Vendor',
        value: '',
        required: false,
        placeholder: 'eg. Nike',
        showAlert: false,
        messageValidate: 'None'
      },
      collection: {
        id: 'productCollection',
        label: 'Collections',
        value: '',
        required: false,
        placeholder: 'eg. Nike',
        showAlert: false,
        messageValidate: 'None'
      }
    })
    return {
      data
    }
  }
}
</script>
<template>
  <form class="create-product-component" @submit.prevent="createProduct">
    <div class="row">
      <div class="col-lg-8">
        <div class="product-information bg-white rounded-6 box-shadow-component">
          <div class="product-information__title p-4 py-3">
            <p class="mb-0 fw-semibold">Product Information</p>
          </div>
          <div class="product-information__body p-4">
            <TitleEditor
                v-bind="data.title"
                class="mt-4 mt-lg-0"
              @updateContent="handleChangeTitle"
            ></TitleEditor>
            <DescriptionEditor
                v-bind="data.description"
                class="mt-4"
              @updateContent="handleUpdateDescription"
            ></DescriptionEditor>
            <ContentEditor
                v-bind="data.content"
                class="mt-4"
              @updateContent="handleChangeContent"
            ></ContentEditor>
          </div>
        </div>
        <div class="product-media mt-4 bg-white rounded-6 box-shadow-component">
          <div class="product-media__title p-4">
            <p class="mb-0 fw-semibold">Media</p>
          </div>
          <div class="product-media__body p-4">
            <ThumbnailEditor></ThumbnailEditor>
            <GalleryEditor class="mt-4"></GalleryEditor>
          </div>
        </div>
      </div>
      <div class="col-lg-4 mt-4 mt-lg-0">
        <div class="product-price bg-white rounded-6 box-shadow-component">
          <div class="product-price__title p-4">
            <p class="mb-0 fw-semibold">Pricing</p>
          </div>
          <div class="product-price__body p-4">
            <OriginalPriceEditor
                v-bind="data.originalPrice"
                class="mt-4 mt-lg-0"
              @updateContent="handleChangeTitle"
            ></OriginalPriceEditor>
            <CurrentPriceEditor
                v-bind="data.currentPrice"
                class="mt-21 mt-lg-0"
              @updateContent="handleChangeTitle"
            >
            </CurrentPriceEditor>
          </div>
          <div class="product-price__footer p-4">
            <p class="mb-0 fw-semibold">
              Note: The original price must be greater than the current price is of the product for
              sale.
            </p>
          </div>
        </div>
        <div class="product-organization bg-white rounded-6 mt-4 box-shadow-component">
          <div class="product-organization__title p-4">
            <p class="mb-0 fw-semibold">Organization</p>
          </div>
          <div class="product-organization__body p-4">
            <VendorEditor
              v-bind="data.vendor"
            ></VendorEditor>
            <CollectionEditor
              class="mt-4"
              v-bind="data.collection"
            >
            </CollectionEditor>
          </div>
        </div>
      </div>
    </div>
  </form>
</template>
<style lang="scss" scoped>
.create-product-component {
  .product-information {
    &__title {
      color: rgba(var(--nav-link-inerhit));
      font-size: 18px;
      border-bottom: 1px solid rgba(231, 234, 243, 0.7);
      font-weight: 700;
    }
    &__body {
      padding-top: 21px !important;
    }
  }
  .product-media {
    &__title {
      color: rgba(var(--nav-link-inerhit));
      font-size: 18px;
      border-bottom: 1px solid rgba(231, 234, 243, 0.7);
      font-weight: 700;
    }
    &__body {
      padding-top: 21px !important;
    }
  }
  .product-price {
    &__title {
      color: rgba(var(--nav-link-inerhit));
      font-size: 18px;
      border-bottom: 1px solid rgba(231, 234, 243, 0.7);
      font-weight: 700;
    }
    &__body {
      padding-top: 21px !important;
    }
    &__footer {
      color: rgba(var(--nav-link-inerhit), 0.78);
      font-size: 15px;
      border-top: 1px solid rgba(231, 234, 243, 0.7);
    }
  }
  .product-organization {
    &__title {
      color: rgba(var(--nav-link-inerhit));
      font-size: 18px;
      border-bottom: 1px solid rgba(231, 234, 243, 0.7);
      font-weight: 700;
    }
    &__body {
      padding-top: 21px !important;
    }
  }
  .mt-21 {
    margin-top: 21px !important;
  }
}
</style>

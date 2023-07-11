<script>
import TitleEditor from '@/components/admin/qilleditor/product/create/TitleEditor.vue'
import DescriptionEditor from '@/components/admin/qilleditor/product/create/DescriptionEditor.vue'
import ContentEditor from '@/components/admin/qilleditor/product/create/ContentEditor.vue'
import ThumbnailEditor from '@/components/admin/qilleditor/product/create/ThumbnailEditor.vue'
import GalleryEditor from '@/components/admin/qilleditor/product/create/GalleryEditor.vue'
import { reactive } from 'vue'
import router from '@/router'
import OriginalPriceEditor from '@/components/admin/qilleditor/product/create/OriginalPriceEditor.vue'
import CurrentPriceEditor from '@/components/admin/qilleditor/product/create/CurrentPriceEditor.vue'
import VendorEditor from '@/components/admin/qilleditor/product/create/VendorEditor.vue'
import CollectionEditor from '@/components/admin/qilleditor/product/create/CollectionEditor.vue'
import TagEditor from '@/components/admin/qilleditor/product/create/TagEditor.vue'
import { useI18n } from 'vue-i18n'

export default {
  name: 'DashboardView',
  components: {
    TagEditor,
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
      console.log(newVal)
    },
    handleChangeSEOKeyword(newVal) {
      this.data.SEOKeyword.value = newVal
    },
    handleUpdateDescription(newVal) {
      this.data.description.value = newVal
    },
    handleChangeContent(newVal) {
      this.data.content.value = newVal
    },
    handleChangeCollection(newCollectionId) {
      this.data.collection.value = newCollectionId
    },
    handleChangeCurrentPrice(newVal) {
      this.data.currentPrice.value = newVal
    },
    scrollToElement(id) {
      const element = document.getElementById(id)
      if (element) {
        const offset = element.offsetTop - 50
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
    const { t } = useI18n()

    const data = reactive({
      title: {
        id: 'productTitle',
        label: t('product.component.product-information.component.product-name.label'),
        value: '',
        required: true,
        placeholder: t('product.component.product-information.component.product-name.placeholder'),
        showAlert: false,
        labelRequired: t(
          'product.component.product-information.component.product-name.label-required'
        ),
        messageValidate: t('validation.required', {
          attribute: t('product.component.product-information.component.product-name.label')
        })
      },
      SEOKeyword: {
        id: 'productSEOKeyword',
        label: t('product.component.product-information.component.product-description.label'),
        value: '',
        required: true,
        placeholder: t(
          'product.component.product-information.component.product-description.placeholder'
        ),
        showAlert: false,
        labelRequired: t(
          'product.component.product-information.component.product-description.label-required'
        ),
        messageValidate: t('validation.required', {
          attribute: t('product.component.product-information.component.product-description.label')
        })
      },
      description: {
        id: 'productDescription',
        label: t('product.component.product-information.component.product-description.label'),
        value: '',
        required: true,
        placeholder: t(
          'product.component.product-information.component.product-description.placeholder'
        ),
        showAlert: false,
        labelRequired: t(
          'product.component.product-information.component.product-description.label-required'
        ),
        messageValidate: t('validation.required', {
          attribute: t('product.component.product-information.component.product-description.label')
        }),
        type: 'quillEditor'
      },
      content: {
        id: 'productContent',
        label: t('product.component.product-information.component.product-content.label'),
        value: '',
        required: true,
        placeholder: t(
          'product.component.product-information.component.product-content.placeholder'
        ),
        showAlert: false,
        labelRequired: t(
          'product.component.product-information.component.product-content.label-required'
        ),
        messageValidate: t('validation.required', {
          attribute: t('product.component.product-information.component.product-content.label')
        }),
        type: 'quillEditor'
      },
      originalPrice: {
        id: 'productOriginalPrice',
        label: t('product.component.product-price.component.original-price.label'),
        value: '',
        required: false,
        placeholder: t('product.component.product-price.component.original-price.placeholder'),
        showAlert: false,
        messageValidate: 'None'
      },
      currentPrice: {
        id: 'productCurrentPrice',
        label: t('product.component.product-price.component.current-price.label'),
        value: '',
        required: false,
        placeholder: t('product.component.product-price.component.current-price.placeholder'),
        showAlert: false,
        messageValidate: 'None'
      },
      vendor: {
        id: 'productVendor',
        label: t('product.component.product-organization.component.product-vendor.label'),
        value: '',
        required: false,
        placeholder: t(
          'product.component.product-organization.component.product-vendor.placeholder'
        ),
        showAlert: false,
        messageValidate: 'None'
      },
      collection: {
        id: 'productCollection',
        label: t('product.component.product-organization.component.product-collection.label'),
        value: '',
        required: false,
        placeholder: t(
          'product.component.product-organization.component.product-collection.placeholder'
        ),
        showAlert: false,
        messageValidate: 'None'
      },
      tag: {
        id: 'productTag',
        label: 'Tag',
        value: '',
        required: false,
        placeholder: 'Tags Product',
        showAlert: false,
        messageValidate: 'None'
      }
    })

    return {
      data,
      t
    }
  }
}
</script>
<template>
  <form class="create-product-component" @submit.prevent="createProduct">
    <div class="row">
      <div class="col-lg-8">
        <div class="product-information bg-white rounded-6 box-shadow-component">
          <div class="product-information__title p-4">
            <p class="mb-0 fw-semibold">{{ t('product.component.product-information.label') }}</p>
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
            <p class="mb-0 fw-semibold">{{ t('product.component.product-media.label') }}</p>
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
            <p class="mb-0 fw-semibold">{{ t('product.component.product-price.label') }}</p>
          </div>
          <div class="product-price__body p-4 pt-0">
            <OriginalPriceEditor
              v-bind="data.originalPrice"
              class="mt-0"
              @updateContent="handleChangeTitle"
            ></OriginalPriceEditor>
            <CurrentPriceEditor
              v-bind="data.currentPrice"
              class="mt-21 mt-lg-0"
              @updateContent="handleChangeCurrentPrice"
            >
            </CurrentPriceEditor>
          </div>
          <div class="product-price__footer p-4">
            <p class="mb-0 fw-semibold">
              {{ t('product.component.product-price.component.priceNote') }}
            </p>
          </div>
        </div>
        <div class="product-organization bg-white rounded-6 mt-4 box-shadow-component">
          <div class="product-organization__title p-4">
            <p class="mb-0 fw-semibold">{{ t('product.component.product-organization.label') }}</p>
          </div>
          <div class="product-organization__body p-4">
            <VendorEditor v-bind="data.vendor"></VendorEditor>
            <CollectionEditor
              class="mt-21"
              v-bind="data.collection"
              @updateContent="handleChangeCollection"
            >
            </CollectionEditor>
          </div>
        </div>
        <div class="product-tag bg-white rounded-6 mt-4 box-shadow-component">
          <div class="product-tag__title p-4">
            <p class="mb-0 fw-semibold">{{ t('product.component.product-tag.label') }}</p>
          </div>
          <div class="product-tag__body pb-4 px-4">
            <TagEditor v-bind="data.tag"> </TagEditor>
          </div>
        </div>
      </div>
    </div>
    <button type="submit" class="btn btn-primary">Primary</button>
  </form>
</template>
<style lang="scss" scoped>
.create-product-component {
  &,
  .product-media,
  .product-price,
  .product-information,
  .product-organization,
  .product-tag {
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
    &__footer {
      color: rgba(var(--nav-link-inerhit), 0.78);
      font-size: 15px;
      border-top: 1px solid rgba(231, 234, 243, 0.7);
    }
  }

  .mt-21 {
    margin-top: 21px !important;
  }
}
</style>

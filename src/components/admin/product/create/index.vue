<script>
import TitleEditor from '@/components/admin/qilleditor/product/create/TitleEditor.vue'
import SeoEditor from '@/components/admin/qilleditor/product/create/SeoEditor.vue'
import DescriptionEditor from '@/components/admin/qilleditor/product/create/DescriptionEditor.vue'
import ContentEditor from '@/components/admin/qilleditor/product/create/ContentEditor.vue'
import ThumbnailEditor from '@/components/admin/qilleditor/product/create/ThumbnailEditor.vue'
import GalleryEditor from '@/components/admin/qilleditor/product/create/GalleryEditor.vue'

export default {
  name: 'DashboardView',
  components: {
    GalleryEditor,
    ThumbnailEditor,
    ContentEditor,
    DescriptionEditor,
    SeoEditor,
    TitleEditor
  },
  methods: {
    handleChangeName(newName) {
      console.log(newName)
    },
    handleChangeContent(newContent) {
      console.log(newContent)
    }
  }
}
</script>
<template>
  <div class="create-product-component p-4 bg-white rounded-6 box-shadow-component">
    <div class="create-product-component__title mb-4">
      <h5 class="mb-0">Create Product</h5>
    </div>
    <form class="create-product-component__form">
      <div class="row row-cols-lg-2 row-cols-1">
        <div class="col">
          <ThumbnailEditor></ThumbnailEditor>
          <GalleryEditor class="mt-4"></GalleryEditor>
        </div>
        <div class="col">
          <TitleEditor
            class="mt-4 mt-lg-0"
            :labelFor="'title'"
            :placeholder="'Enter the product name ...'"
            :title="'Product Name & Seo Title'"
            required
            @updateContent="handleChangeName"
          ></TitleEditor>
          <SeoEditor
            :labelFor="'seo-keyword'"
            :placeholder="'Enter the product SEO Keyword'"
            :title="'SEO Keyword of Product'"
            class="mt-4"
            required
            @changeValue="handleChangeName"
          ></SeoEditor>
          <DescriptionEditor
            :placeholder="'Enter the product description ...'"
            :title="'Product Description'"
            class="mt-4"
          ></DescriptionEditor>
        </div>
      </div>
      <ContentEditor
        @updateContent="handleChangeContent"
        :placeholder="'Enter the product content ...'"
        :title="'Product Content'"
        class="mt-4"
      ></ContentEditor>
      <button type="submit"></button>
    </form>
  </div>
</template>

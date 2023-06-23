<script>
import TitleEditor from '@/components/admin/qilleditor/TitleEditor.vue'
import SeoEditor from '@/components/admin/qilleditor/SeoEditor.vue'
import DescriptionEditor from '@/components/admin/qilleditor/DescriptionEditor.vue'
import ContentEditor from '@/components/admin/qilleditor/ContentEditor.vue'
import ThumbnailEditor from '@/components/admin/qilleditor/ThumbnailEditor.vue'
import GalleryEditor from '@/components/admin/qilleditor/GalleryEditor.vue'

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
    handleChangeName(name) {
      console.log(name)
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
          <!--          <SeoEditor-->
          <!--            :labelFor="'seo-keyword'"-->
          <!--            :placeholder="'Typing'"-->
          <!--            :title="'Seo Keyword'"-->
          <!--            class="mt-4"-->
          <!--            required-->
          <!--            @changeValue="handleChangeName"-->
          <!--          ></SeoEditor>-->
        </div>
        <div class="col">
          <TitleEditor
            class="mt-4 mt-lg-0"
            :labelFor="'title'"
            :placeholder="'Typing'"
            :title="'Product Name & Seo title'"
            required
            @changeValue="handleChangeName"
          ></TitleEditor>

          <DescriptionEditor
            :placeholder="'Typing'"
            :title="'Description'"
            class="mt-4"
          ></DescriptionEditor>
        </div>
      </div>
      <ContentEditor :placeholder="'Typing'" :title="'Content'" class="mt-4"></ContentEditor>
      <button type="submit"></button>
    </form>
  </div>
</template>

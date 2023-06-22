<script>
import TitleEditor from '@/components/admin/qilleditor/TitleEditor.vue'
import SeoEditor from '@/components/admin/qilleditor/SeoEditor.vue'
import DescriptionEditor from '@/components/admin/qilleditor/DescriptionEditor.vue'
import ContentEditor from '@/components/admin/qilleditor/ContentEditor.vue'

export default {
  name: 'DashboardView',
  components: { ContentEditor, DescriptionEditor, SeoEditor, TitleEditor },
  methods: {
    handleChangeName(name) {
      console.log(name)
    }
  }
}
</script>
<template>
  <div class="create-product-component p-4 bg-white rounded-6 box-shadow-component">
    <h5>Create Product</h5>
    <form>
      <TitleEditor
        :title="'Product Name & Seo title'"
        :labelFor="'title'"
        @changeValue="handleChangeName"
        :placeholder="'Typing'"
        required
      ></TitleEditor>
      <SeoEditor
        class="mt-3"
        :title="'Seo Keyword'"
        :labelFor="'seo-keyword'"
        @changeValue="handleChangeName"
        :placeholder="'Typing'"
        required
      ></SeoEditor>
      <DescriptionEditor
        :placeholder="'Typing'"
        class="mt-3"
        :title="'Description'"
      ></DescriptionEditor>
      <ContentEditor :placeholder="'Typing'" class="mt-3" :title="'Content'"> </ContentEditor>
      <button type="submit"></button>
    </form>
  </div>
</template>

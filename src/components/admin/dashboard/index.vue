<script>
import TitleEditor from '@/components/admin/qilleditor/TitleEditor.vue'
import SeoEditor from '@/components/admin/qilleditor/SeoEditor.vue'
import DescriptionEditor from '@/components/admin/qilleditor/DescriptionEditor.vue'

export default {
  name: 'DashboardView',
  components: { DescriptionEditor, SeoEditor, TitleEditor },
  methods: {
    handleChangeName(name) {
      console.log(name)
    }
  }
}
</script>
<template>
  <div class="p-3 bg-white">
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
        :title="'Seo description'"
        :labelFor="'seo-description'"
        @changeValue="handleChangeName"
        :placeholder="'Typing'"
        required
      ></SeoEditor>
      <DescriptionEditor
        :placeholder="'Typing'"
        class="mt-3"
        :title="'Description'"
      ></DescriptionEditor>
      <button type="submit"></button>
    </form>
  </div>
</template>

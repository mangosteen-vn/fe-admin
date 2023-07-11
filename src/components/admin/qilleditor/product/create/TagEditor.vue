<script lang="ts" setup>
import { defineProps, onMounted, onServerPrefetch, reactive, ref } from 'vue'
import IconSelect from '@/components/icons/product/create/IconSelect.vue'
import IconClear from '@/components/icons/product/create/IconClear.vue'
import { getTags } from '@/utils/tag'

const tags = ref([])
const tagsSelected = ref([])

const props = defineProps({
  labelFor: String,
  label: String,
  placeholder: String,
  required: Boolean,
  message: String,
  showAlert: Boolean
})

const fetchTags = async () => {
  try {
    const { data } = await getTags(-1, 'product')
    tags.value = data
  } catch (error) {
    console.error(error)
  }
}

onServerPrefetch(fetchTags())

onMounted(async () => {
  const tagUnsaved: string | null = localStorage.getItem('tagUnsaved')
  if (tagUnsaved) {
    tags.value = JSON.parse(tagUnsaved)
  }
  if (!tags.value) {
    await fetchTags()
  }
})

const handleClearTags = () => {
  tagsSelected.value = null
}
</script>
<template>
  <div class="mangosteen-tag-editor">
    <label :for="labelFor" class="mangosteen-tag-editor__label form-label"> {{ label }}</label>
    <div class="mangosteen-tag-editor__combobox v-combobox--custom-v1 h-40">
      <v-combobox
        v-model="tagsSelected"
        :items="tags"
        :menu-icon="null"
        chips
        class="mangosteen__combobox"
        clear
        clearable
        hide-details
        hide-no-data
        hide-selected
        item-title="name"
        multiple
        return-object
        variant="outlined"
      >
        <template #clear>
          <IconClear @click="handleClearTags"></IconClear>
        </template>
        <template #append-inner>
          <IconSelect></IconSelect>
        </template>
      </v-combobox>
    </div>
  </div>
</template>
<style lang="scss" scoped>
.mangosteen-tag-editor {
  &__label {
    margin-bottom: 4px;
    font-size: 15px;
    font-weight: 500;
    color: var(--bs-black);
  }
}
</style>

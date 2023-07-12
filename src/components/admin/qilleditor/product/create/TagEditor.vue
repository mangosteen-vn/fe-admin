<script lang="ts" setup>
import { defineProps, onMounted, defineEmits, ref, onBeforeMount, watch } from 'vue'
import IconSelect from '@/components/icons/product/create/IconSelect.vue'
import IconClear from '@/components/icons/product/create/IconClear.vue'
import { getTags } from '@/utils/tag'

const tags = ref([])
const tagsSelected = ref([])

const emit = defineEmits(['updateContent'])
const props = defineProps({
  labelFor: String,
  label: String,
  placeholder: {
    type: String,
    default: ''
  },
  required: Boolean,
  message: String,
  showAlert: Boolean
})

const fetchTags = async () => {
  try {
    const { data } = await getTags(-1, 'product')
    const names = data.map((obj: { name: any }) => obj.name)
    tags.value = names
  } catch (error) {
    console.error(error)
  }
}

const handleUpdateContent = (newValue) => {
  emit('updateContent', newValue)
  localStorage.setItem('productTagUnsaved', JSON.stringify(newValue))
}

onBeforeMount(async () => {
  await fetchTags()
})

onMounted(async () => {
  const productTagUnsaved: string | null = localStorage.getItem('productTagUnsaved')
  if (productTagUnsaved) {
    tagsSelected.value = JSON.parse(productTagUnsaved)
  }
})

const handleClearTags = () => {
  tagsSelected.value = null
  localStorage.removeItem('productTagUnsaved')
}

watch(tagsSelected, (newValue: any) => {
  emit('updateContent', newValue)
})
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
        item-title="name"
        hide-details
        hide-no-data
        hide-selected
        multiple
        return-object
        :placeholder="placeholder"
        variant="outlined"
        @update:modelValue="handleUpdateContent"
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

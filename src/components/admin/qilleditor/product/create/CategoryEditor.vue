<script lang="ts" setup>
import { defineProps, onMounted, defineEmits, ref, onBeforeMount } from 'vue'
import IconSelect from '@/components/icons/product/create/IconSelect.vue'
import IconClear from '@/components/icons/product/create/IconClear.vue'
import { getCategories } from '@/utils/category'

const categories = ref([])
const categoriesSelected = ref([])
const emit = defineEmits(['updateContent'])

const props = defineProps({
  labelFor: String,
  label: {
    type: String,
    default: ''
  },
  placeholder: {
    type: String,
    default: ''
  },
  required: Boolean,
  message: String,
  showAlert: Boolean
})

const fetchCategories = async () => {
  try {
    const { data } = await getCategories(-1, 'product')
    categories.value = data
  } catch (error) {
    console.error(error)
  }
}

const handleUpdateContent = (newValue: any) => {
  emit('updateContent', newValue)
  localStorage.setItem('productCategoryUnsaved', JSON.stringify(newValue))
}

onBeforeMount(fetchCategories)

onMounted(() => {
  const productCategoryUnsaved = localStorage.getItem('productCategoryUnsaved')
  if (productCategoryUnsaved) {
    categoriesSelected.value = JSON.parse(productCategoryUnsaved)
  }
})

const handleClearTags = () => {
  categoriesSelected.value = null
  emit('updateContent', null)
  localStorage.removeItem('productCategoryUnsaved')
}
</script>

<template>
  <div class="mangosteen-category-editor">
    <label :for="labelFor" class="mangosteen-category-editor__label form-label"> {{ label }}</label>
    <div class="mangosteen-category-editor__combobox v-autocomplete--custom-v1 h-40">
      <v-autocomplete
        :items="categories"
        :menu-icon="null"
        v-model="categoriesSelected"
        :placeholder="placeholder"
        chips
        class="mangosteen__autocomplete"
        hide-details
        hide-selected
        item-value="id"
        item-title="name"
        multiple
        return-object
        variant="outlined"
        @update:modelValue="handleUpdateContent"
      >
        <template #clear>
          <IconClear @click="handleClearTags"></IconClear>
        </template>
        <template #append-inner>
          <IconSelect></IconSelect>
        </template>
      </v-autocomplete>
    </div>
  </div>
</template>
<style lang="scss" scoped>
.mangosteen-category-editor {
  &__label {
    margin-bottom: 4px;
    font-size: 15px;
    font-weight: 500;
    color: var(--bs-black);
  }
}
</style>

<script lang="ts" setup>
import { onMounted, ref, onServerPrefetch, defineProps, defineEmits } from 'vue'
import IconSelect from '@/components/icons/product/create/IconSelect.vue'
import IconClear from '@/components/icons/product/create/IconClear.vue'
import { getCollections } from '@/utils/collection/collection'

const collection = ref(null)
const collections = ref([])

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
  message: {
    type: String,
    default: ''
  },
  showAlert: Boolean
})

const emit = defineEmits(['updateContent'])

const fetchCollections = async () => {
  try {
    const { data } = await getCollections(-1)
    collections.value = data
  } catch (error) {
    console.error(error)
  }
}

onServerPrefetch(fetchCollections())

onMounted(async () => {
  const collectionUnsaved: string | null = localStorage.getItem('collectionUnsaved')
  if (collectionUnsaved) {
    collection.value = JSON.parse(collectionUnsaved)
  }
  if (!collections.value) {
    await fetchCollections()
  }
})

const handleUpdateCollection = (content: any) => {
  collection.value = content
  emit('updateContent', content)
  localStorage.setItem('collectionUnsaved', JSON.stringify(collection.value))
}

const handleClearCollection = () => {
  handleUpdateCollection(null)
}

const handleChangeCollection = () => {
  handleUpdateCollection(collection.value)
}
</script>
<template>
  <div class="mangosteen-collection-editor">
    <label :for="labelFor" class="mangosteen-collection-editor__label form-label">
      {{ label }}</label
    >
    <div class="mangosteen-collection-editor__select v-select--custom-v1 h-40">
      <v-select
        :menu-icon="null"
        append-inner-icon
        class="mangosteen__select"
        clear
        clearable
        density="compact"
        hide-details
        variant="outlined"
        return-object
        item-title="name"
        :placeholder="placeholder"
        v-model="collection"
        :items="collections"
        @update:modelValue="handleChangeCollection"
      >
        <template #append-inner>
          <IconSelect></IconSelect>
        </template>
        <template #clear>
          <IconClear @click="handleClearCollection"></IconClear>
        </template>
      </v-select>
    </div>
  </div>
</template>
<style scoped lang="scss">
.mangosteen-collection-editor {
  &__label {
    margin-bottom: 4px;
  }
}
</style>

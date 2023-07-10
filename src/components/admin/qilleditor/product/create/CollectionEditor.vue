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

<script lang="ts" setup>
import { onMounted, ref, onServerPrefetch, defineProps, defineEmits } from 'vue'
import IconSelect from '@/components/icons/product/create/IconSelect.vue'
import IconClear from '@/components/icons/product/create/IconClear.vue'
import { getCollections } from '@/utils/collection/collection'

const collection = ref(null)
const collections = ref([])

const props = defineProps({
  labelFor: String,
  label: String,
  placeholder: String,
  required: Boolean,
  message: String,
  showAlert: Boolean
})

const emit = defineEmits(['updateContent'])

async function fetchCollections() {
  try {
    const { data } = await getCollections(-1)
    collections.value = data
  } catch (error) {
    console.error(error)
  }
}

onServerPrefetch(fetchCollections())

onMounted(async () => {
  const collectionUnsaved = localStorage.getItem('collectionUnsaved')
  if (collectionUnsaved) {
    collection.value = JSON.parse(collectionUnsaved)
  }
  if (!collections.value) {
    await fetchCollections()
  }
})

function handleClearCollection() {
  collection.value = null
  emit('updateContent', null)
}

function handleChangeCollection() {
  emit('updateContent', collection.value)
  localStorage.setItem('collectionUnsaved', JSON.stringify(collection.value))
}
</script>

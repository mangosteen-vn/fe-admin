<template>
  <div class="mangosteen-collection-editor">
    <label :for="labelFor" class="mangosteen-collection-editor__label form-label">
      {{ label }}</label
    >
    <div class="mangosteen-tag-editor__combobox v-combobox--custom-v1 h-40">
      <v-combobox
        :menu-icon="null"
        clear
        clearable
        hide-details
        chips
        label=""
        :items="['California', 'Colorado', 'Florida', 'Georgia', 'Texas', 'Wyoming']"
        variant="outlined"
        hide-no-data
        hide-selected
        multiple
      >
        <template #clear>
          <IconClear @click="handleClearCollection"></IconClear>
        </template>
        <template #append-inner>
          <IconSelect></IconSelect>
        </template>
      </v-combobox>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, onMounted, ref } from 'vue'
import IconSelect from '@/components/icons/product/create/IconSelect.vue'
import IconClear from '@/components/icons/product/create/IconClear.vue'
import { getCollections } from '@/utils/collection/collection'

export default defineComponent({
  components: { IconClear, IconSelect },
  props: {
    labelFor: String,
    label: String,
    placeholder: String,
    required: Boolean,
    message: String,
    showAlert: Boolean
  },
  setup(props: any, { emit }: any) {
    const collection = ref(null)
    const collections = ref([])

    async function fetchCollections() {
      try {
        const { data } = await getCollections(-1)
        collections.value = data
        console.log('Collections:', data)
      } catch (error) {
        console.error(error)
      }
    }

    onMounted(() => {
      const collectionUnsaved = localStorage.getItem('collectionUnsaved')
      if (collectionUnsaved) {
        collection.value = JSON.parse(collectionUnsaved)
      }
      fetchCollections()
    })

    function handleClearCollection() {
      collection.value = null
      emit('updateContent', null)
    }

    function handleChangeCollection() {
      emit('updateContent', collection.value)
      localStorage.setItem('collectionUnsaved', JSON.stringify(collection.value))
    }

    return {
      collection,
      collections,
      handleClearCollection,
      handleChangeCollection
    }
  }
})
</script>

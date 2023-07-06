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

    onMounted(fetchCollections)

    function handleClearCollection() {
      collection.value = null
      emit('updateContent', null)
    }

    function handleChangeCollection() {
      emit('updateContent', collection.value.id)
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

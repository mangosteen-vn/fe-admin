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
import { defineComponent, onMounted, ref, watch } from 'vue'
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
    showAlert: Boolean,
    value: Object
  },
  setup(props: any, { emit }: any) {
    const collection = ref(props.value || null)
    const collections = ref([])

    async function fetchCollections() {
      try {
        const { data } = await getCollections(-1)
        collections.value = data
      } catch (error) {
        console.error(error)
      }
    }

    watch(
      () => props.value,
      (newVal: null) => {
        if (newVal !== null) {
          collection.value = newVal
        }
      }
    )

    onMounted(fetchCollections)

    function handleClearCollection() {
      collection.value = null
      emit('updateContent', null)
    }

    function handleChangeCollection() {
      emit('updateContent', collection.value)
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

<style lang="scss">
.mangosteen-collection-editor {
  position: relative;

  &__label {
    margin-bottom: 4px;
    font-size: 14px;
    color: var(--bs-black);
    font-weight: 500;
  }
}
</style>

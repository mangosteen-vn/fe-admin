<script>
export default {
  props: ['openAside']
}
</script>
<template>
  <v-tooltip v-if="openAside" text="Open Aside" location="bottom">
    <template v-slot:activator="{ props }">
      <svg
        v-bind="props"
        xmlns="http://www.w3.org/2000/svg"
        class="icon icon-tabler icon-tabler-menu-2"
        width="44"
        height="44"
        viewBox="0 0 24 24"
        stroke-width="1.5"
        stroke="#2c3e50"
        fill="none"
        stroke-linecap="round"
        stroke-linejoin="round"
      >
        <path stroke="none" d="M0 0h24v24H0z" fill="none" />
        <path d="M4 6l16 0" />
        <path d="M4 12l16 0" />
        <path d="M4 18l16 0" />
      </svg>
    </template>
  </v-tooltip>
  <v-tooltip v-else text="Close Aside" location="bottom">
    <template v-slot:activator="{ props }">
      <svg
        v-bind="props"
        xmlns="http://www.w3.org/2000/svg"
        class="icon icon-tabler icon-tabler-menu-2"
        width="44"
        height="44"
        viewBox="0 0 24 24"
        stroke-width="1.5"
        stroke="#2c3e50"
        fill="none"
        stroke-linecap="round"
        stroke-linejoin="round"
      >
        <path stroke="none" d="M0 0h24v24H0z" fill="none" />
        <path d="M4 6l16 0" />
        <path d="M4 12l16 0" />
        <path d="M4 18l16 0" />
      </svg>
    </template>
  </v-tooltip>
</template>
<style lang="scss">
.icon {
  width: 26px;
  height: 26px;
  stroke: rgba(var(--nav-link-inerhit), 0.68);
  &:focus {
    outline: none;
  }
}
</style>

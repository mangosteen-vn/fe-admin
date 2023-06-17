<script>
export default {
  props: ['openAside'],
  created() {
    console.log(this.openAside)
  }
}
</script>
<template>
  <v-tooltip v-if="openAside" text="Open Aside" location="bottom">
    <template v-slot:activator="{ props }">
      <svg
        v-bind="props"
        xmlns="http://www.w3.org/2000/svg"
        class="icon icon-tabler icon-tabler-transition-right"
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
        <path d="M18 3a3 3 0 0 1 3 3v12a3 3 0 0 1 -3 3" />
        <path d="M3 18v-12a3 3 0 1 1 6 0v12a3 3 0 0 1 -6 0z" />
        <path d="M9 12h8" />
        <path d="M14 15l3 -3l-3 -3" />
      </svg>
    </template>
  </v-tooltip>
  <v-tooltip v-else text="Close Aside" location="bottom">
    <template v-slot:activator="{ props }">
      <svg
        v-bind="props"
        class="icon icon-tabler icon-tabler-transition-left"
        fill="none"
        height="44"
        stroke="#2c3e50"
        stroke-linecap="round"
        stroke-linejoin="round"
        stroke-width="1.5"
        viewBox="0 0 24 24"
        width="44"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path d="M0 0h24v24H0z" fill="none" stroke="none" />
        <path d="M6 21a3 3 0 0 1 -3 -3v-12a3 3 0 0 1 3 -3" />
        <path d="M21 6v12a3 3 0 0 1 -6 0v-12a3 3 0 0 1 6 0z" />
        <path d="M15 12h-8" />
        <path d="M10 9l-3 3l3 3" />
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

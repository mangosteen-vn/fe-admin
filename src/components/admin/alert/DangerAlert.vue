<script>
export default {
  props: {
    message: String,
    show: Boolean
  }
}
</script>
<template>
  <div v-show="show" class="alert alert-danger" role="alert">
    {{ message }}
  </div>
</template>
<style lang="scss" scoped>
.alert-danger {
  background-color: rgba(234, 84, 85, 0.16);
  color: rgb(234, 84, 85);
  padding: 11px 0.9375rem;
  border: 0 solid transparent;
  border-radius: 0.375rem;
  font-weight: 600;
  font-size: 16px;
  margin: 0;
}
</style>

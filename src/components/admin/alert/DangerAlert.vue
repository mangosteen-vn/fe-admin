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
  background-color: #ffe0db;
  color: #ff3e1d;
  padding: 0.9375rem 0.9375rem;
  border: 0 solid transparent;
  border-radius: 0.375rem;
  font-weight: 500;
  font-size: 14px;
  margin: 0;
}
</style>

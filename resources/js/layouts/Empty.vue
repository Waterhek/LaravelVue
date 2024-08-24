<template>
    <div class="main-empty">
      <router-view />
    </div>
  </template>

<script>
export default{
    name: 'EmptyLayout',
}
</script>

<style scoped>
.main-empty{
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
}
</style>
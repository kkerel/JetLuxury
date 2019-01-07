<template>
  <router-view></router-view>
</template>

<script>

export default {
  name: 'Product',
  created () {
    this.$router.push({ name: 'FaqList' })
  }
}
</script>

<style scoped>
</style>

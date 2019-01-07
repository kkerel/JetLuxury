<template>
  <router-view></router-view>
</template>

<script>

export default {
  name: 'Banner',
  created () {
    this.$router.push({ name: 'BrandBanner' })
  }
}
</script>

<style scoped>
</style>

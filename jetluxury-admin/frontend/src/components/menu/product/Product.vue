<template>
  <router-view></router-view>
</template>

<script>

export default {
  name: 'Product',
  created () {
    this.$router.push({ name: 'ProductControl' })
  }
}
</script>

<style lang="scss" scoped>

</style>

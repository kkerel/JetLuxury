<template>
  <router-view></router-view>
</template>

<script>

export default {
  name: 'Order',
  created () {
    this.$router.push({ name: 'IntegratedOrder' })
  }
}
</script>

<style scoped>
</style>

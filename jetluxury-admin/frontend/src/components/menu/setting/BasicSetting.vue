<template>
  <router-view></router-view>
</template>

<script>

export default {
  name: 'BasicSetting',
  created () {
    this.$router.push({ name: 'OperatorControl' })
  }
}
</script>

<style lang="scss" scoped>

</style>

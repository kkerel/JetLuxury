<template>
  <div class="contents_wrap">
    <router-view></router-view>
  </div>
</template>

<script>

  export default {
    name: 'Sns',
    created () {
      this.$router.push({ name: 'SnsSetup' })
    }
  }
</script>

<style lang="scss" scoped>

</style>

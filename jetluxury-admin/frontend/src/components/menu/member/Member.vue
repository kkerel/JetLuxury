<template>
  <router-view></router-view>
</template>

<script>

export default {
  name: 'Member',
  created () {
    this.$router.push({ name: 'MemberList' })
  }
}
</script>

<style scoped>
</style>

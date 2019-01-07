<template>
  <div id="sign_wrap">
      <div class="sign_contents" @click="sign">회원가입</div>
    </div>
</template>

<script>
export default {
  data () {
    return {
    }
  },
  methods: {
    sign () {
      this.$router.push({name: 'signin'})
    }
  }
}
</script>

<style scoped>
</style>

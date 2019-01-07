<template>
  <h3 class="page__contents__title">
    <span>&nbsp;&middot;&nbsp;{{ SubTitle.title }}</span>
  </h3>
</template>

<script>

export default {
  name: 'PageSubTitle',
  props: {
    SubTitle: {
      type: Object,
      default () {
        return {
          title: '메인 타이틀'
        }
      }
    }
  }
}
</script>

<style lang="scss" scoped>
  .page__contents__title{font-size:20px; font-weight:bold;}
</style>

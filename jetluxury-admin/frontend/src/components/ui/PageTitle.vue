<template>
  <div class="page__title">
    <span>{{ page.title }}</span>
    <span class="page__depth__title--icon">{{ page.subTitle}}</span>
  </div>
</template>

<script>
export default {
  name: 'PageTitle',
  props: {
    page: {
      type: Object,
      default () {
        return {
          title: '메인 타이틀',
          subTitle: '서브 타이틀'
        }
      }
    }
  }
}
</script>

<style lang="scss" scoped>
  .page__title{width:100%; display:table; border-bottom:1px solid #444857; padding-bottom:30px; font-size:26px; font-weight:bold; margin-bottom:60px;
    span{float:left;}
    .page__depth__title--icon{background:url(../../assets/images/icon/history_icon.svg) center left no-repeat; background-size:10px 18px; padding-left:30px; margin-left:20px;}
  }
</style>

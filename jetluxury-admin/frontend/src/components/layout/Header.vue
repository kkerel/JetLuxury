<template>
  <header class="jetl__header">
    <div class="jetl__header__logo"><a href=""><img src="../../assets/images/common/logo.svg" alt="jet luxury"></a></div>
    <div class="jetl__header__select">
      <!--
        Component paths below ↓↓↓↓  from 'components/ui/select'
      -->
      <Select/>
    </div>
  </header>
</template>

<script>
import Select from 'components/ui/Select'
export default {
  data () {
    return {
    }
  },
  components: {
    Select
  }
}
</script>

<style lang="scss" scoped>
.jetl__header{width:100%; height:70px; position:absolute; top:0px; left:0px; z-index:11; background:#282c38;
  &__logo{width:inherit; height:inherit; line-height:70px; float:left; color:#fff; font-weight:bold; font-family:'Work'; font-size:20px; letter-spacing: 1.6px; text-indent:30px;
    img{width:136px;}
  }
  &__select{width:270px; float:right; background:#fff; height:71px; background:#fff; position:absolute; top:0px; right:0px; z-index:10;}
}
</style>

<template>
  <div class="jetl">
    <ui-header/>
    <ui-aside/>
    <section class="jetl__container">
      <div class="jetl__container__wrap">
        <router-view/>
      </div>
    </section>
  </div>
</template>

<script>
import Header from 'components/layout/Header'
import Aside from 'components/layout/Aside'

export default {
  name: 'Main',
  components: {
    'ui-header': Header,
    'ui-aside': Aside
  }
}
</script>

<style lang="scss" scoped>
  .jetl{width:100%; height:100%; position:relative; display:table;
    &__container{padding:70px 0px 0px 200px; background:#fafafa; transition:3s ease-in-out; -webkit-transition: .3s ease-in-out; -moz-transition: .3s ease-in-out; -ms-transition: .3s ease-in-out; -o-transition: .3s ease-in-out;
      &__wrap{padding:60px;}
    }
  }
  .section--action{padding-left:0px!important; transition:3s ease-in-out; -webkit-transition: .3s ease-in-out; -moz-transition: .3s ease-in-out; -ms-transition: .3s ease-in-out; -o-transition: .3s ease-in-out;
    .jetl__container__wrap{width:100%;}
    @media all and (max-width: 1680px) {
      .jetl__container__wrap{width:1680px;}
    }
  }
  @media all and (max-width: 1680px) {
    .jetl__container__wrap{width:1480px;}
  }
</style>

<template>
  <div class="select_btn">
    <div class="select_contents" tabindex="-1" @blur="hide">
      <div class="select" v-on:click="onShow">
        <p :class="this.pArrowUp">{{user}}</p>
      </div>
      <ul class="select_view" :style="this.selectViewStyle">
        <li v-on:click="mainStatus">주요현황</li>
        <li v-on:click="operator">관리자설정</li>
        <li v-on:click="logout">로그아웃</li>
      </ul>
    </div>
  </div>
</template>
<script>
  /*eslint-disable*/
  export default {
    data () {
      return {
        selectViewStyle: {
          display: 'none'
        },
        pArrowUp: ''
      }
    },
    computed: {
      user () {
        return this.$store.state.user.email
      },
      loading () {
        return this.$store.state.loading
      }
    },
    methods: {
      mainStatus() {
        this.$router.push('/main/home')
      },
      operator() {
        this.$router.push('/main/setting/operatorcontrol')
        },
      onShow () {
        if (this.selectViewStyle.display === 'none') {
          this.pArrowUp = 'arrow_up'
          this.selectViewStyle.display = 'block'
        } else {
          this.pArrowUp = ''
          this.selectViewStyle.display = 'none'
        }
      },
      hide () {
        this.pArrowUp = ''
        this.selectViewStyle.display = 'none'
      },
      logout: function () {
        this.$store.state.error = null
        this.$store.dispatch('logout')
          .then(() => {
            this.$router.push('/signin')
          })
      }
    }
  }
</script>

<style lang="scss" scoped>
  .select_btn{outline:none;}
</style>

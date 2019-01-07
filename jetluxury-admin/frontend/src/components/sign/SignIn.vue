<template>
  <div class="sign">
    <div class="sign__logo"><img src="../../assets/images/common/logo.svg" alt="jet luxury"></div>
    <div class="sign__login shadow">
      <div class="sign__login__title">로그인</div>
      <div class="sign__login--error">{{error}} {{rememberMe}}</div>
      <div class="sign__login__input">
        <input type="text" placeholder="아이디(이메일) 주소를 입력해주세요." v-model="username">
        <input type="password" placeholder="패스워드를 입력해주세요." v-model="password">
      </div>
      <div class="sign__login--check">
        <input type="checkbox" id="login" v-model="checked">
        <label for="login">로그인 유지하기</label>
      </div>
      <button class="sign__login__btn" @click="home()">로그인</button>
    </div>
  </div>
</template>
<script>
  /*eslint-disable*/
  export default {
  data () {
    return {
        username: null,
        password: null,
        checked: false
    }
  },
  created(){
  },
    computed: {
      error () {
        return this.$store.state.error
      },
      rememberMe()
      {
        if (this.$store.state.checked == true && this.$store.state.user) {
          this.username = this.$store.state.user.email
          this.password = this.$store.state.user.password
        }
      }
    },
  methods: {
    sign () {
      this.$router.push({name: 'signup'})
    },
    home () {
      this.$store.dispatch('userSignIn', { email: this.username, password: this.password })
      this.$store.dispatch('rememberMe', { checked: this.checked})
    }
  }
}
</script>

<style lang="scss" scoped>
  .shadow{box-shadow: 0 3px 6px 0 rgba(0, 0, 0, 0.1);}
  .sign{position:relative; background:#f5f5f5;
    /* 로고 */
    &__logo{width:100%; height:70px; border-bottom:1px solid #000; position:absolute; top:0px; left:0px; z-index:10; background:#282c38; color:#fff; font-weight:bold; font-family:'Work'; font-size:20px; letter-spacing:1.6px; text-indent:30px; line-height:70px;
      img{width: 136px;}
    }
    /* 로그인 컨텐츠 */
    &__login{background:#fff; padding:80px; margin-top:70px;
      &__title{font-size:30px; font-weight:bold; color:#333; text-align:center; padding-bottom:66px;}
      &--check{width:100%; display:table; padding-top:14px; padding-bottom:60px;
        input{float:left; font-size:16px; cursor:pointer;}
        label{float:left; cursor:pointer; margin-left:10px;}
      }
      &--error{color:red;}
      &__input{
        input{width:100%; display:block; border:0px; border-bottom:1px solid #ddd; padding:10px 0px; text-indent:10px; font-size:16px; box-sizing:border-box;
          &:first-child{margin-bottom:30px;}
        }
      }
      &__btn{margin-top:60px; clear: both; width: 390px; display: table; margin: 0 auto; background: #282c38; font-size: 18px; font-weight: bold; color: #fff; height: 55px; line-height: 53px; border-radius: 10px; box-shadow: 0 3px 10px 0 rgba(68, 72, 87, 0.45); cursor:pointer;}
    }
  }
</style>

<template>
  <aside class="jetl__aside">
    <div class="jetl__aside__contents">
      <div class="jetl__aside__btn" @click="asideAction"></div>
      <ul class="jetl__aside__menu">
        <li class="jetl__aside__conetents--first"><router-link v-bind:to="{ path: '/main/home' }">HOME</router-link></li>
        <!-- 기본 설정 -->
        <li>
          <div>
            <router-link v-bind:to="{ path: '/main/setting' }" :class="this.pArrowUp" v-if="role == 'admin'">기본설정</router-link>
            <div class="jetl__aside__contents__view">
              <div>
                <router-link v-bind:to="{ path: '/main/setting/operatorcontrol' }">운영자관리</router-link>
              </div>
              <div>
                <router-link v-bind:to="{ path: '/main/setting/securitycontrol' }">보안관리정책</router-link>
              </div>
            </div>
          </div>
        </li>
        <!-- // 기본 설정 -->
        <!-- 상품 -->
        <li>
          <div>
            <router-link v-bind:to="{ path: '/main/product' }" :class="this.pArrowUp" v-if="role == 'admin' || role == 'employee'">상품</router-link>
            <div class="jetl__aside__contents__view">
              <div>
                <router-link v-bind:to="{ path: '/main/product/productcontrol' }">상품관리</router-link>
              </div>
              <div>
                <router-link v-bind:to="{ path: '/main/product/searchcontrol' }">검색관리</router-link>
              </div>
            </div>
          </div>
        </li>
        <!-- // 상품 -->
        <!-- 주문/배송 -->
        <li>
          <div>
            <router-link v-bind:to="{ path: '/main/order' }" :class="this.pArrowUp">주문/배송</router-link>
            <div class="jetl__aside__contents__view">
              <div>
                <router-link v-bind:to="{ path: '/main/order/integratedorder' }">주문통합 리스트</router-link>
              </div>
              <div>
                <router-link v-bind:to="{ path: '/main/order/integrateddelivery' }">배송통합 리스트</router-link>
              </div>
            </div>
          </div>
        </li>
        <!-- // 주문/배송 -->
        <!-- 회원 -->
        <li>
          <router-link v-bind:to="{ path: '/main/member' }" v-if="role == 'admin' || role == 'employee' ">회원</router-link>
          <div class="jetl__aside__contents__view">
            <div><router-link v-bind:to="{ path: '/main/member/memberlist' }">회원리스트</router-link></div>
            <div><router-link v-bind:to="{ path: '/main/member/memberdormancy' }">회원탈퇴/삭제</router-link></div>
          </div>
        </li>
        <!-- // 회원 -->
        <!-- 게시판 -->
        <li>
          <router-link v-bind:to="{ path: '/main/board' }" v-if="role == 'admin' || role == 'employee' || role == 'partime' ">게시판</router-link>
          <div class="jetl__aside__contents__view">
            <div><router-link v-bind:to="{ path: '/main/board/faqlist' }">FAQ 리스트</router-link></div>
            <!--<div><router-link v-bind:to="{ path: '/main/board/qna' }">상품Q&A</router-link></div>-->
            <div><router-link v-bind:to="{ path: '/main/board/cs' }">1:1문의</router-link></div>
          </div>
        </li>
        <!-- // 회원 -->
        <!-- 배너 -->
        <li>
          <router-link v-bind:to="{ path: '/main/banner' }">배너</router-link>
          <div class="jetl__aside__contents__view">
            <div><router-link v-bind:to="{ path: '/main/banner/brandbanner' }">브랜드배너</router-link></div>
            <div><router-link v-bind:to="{ path: '/main/banner/eventbanner' }">이벤트배너</router-link></div>
          </div>
        </li>
        <!-- // 배너 -->
        <!--  SNS -->
        <!--<li>-->
          <!--<router-link v-bind:to="{ path: '/main/sns' }">sns관리</router-link>-->
          <!--<div class="jetl__aside__contents__view">-->
            <!--<div><router-link v-bind:to="{ path: '/main/sns/snssetup' }">SNS공유설정</router-link></div>-->
          <!--</div>-->
        <!--</li>-->
        <!-- // SNS -->
      </ul>
    </div>
  </aside>
</template>

<script>
export default {
  data () {
    return {
      selectViewStyle: {
        display: 'none'
      },
      pArrowUp: '',
      role: this.$store.state.user.role
    }
  },
  methods: {
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
    asideAction () {
      const asideBtn = document.getElementsByClassName('jetl__aside')
      const section = document.getElementsByClassName('jetl__container')
      asideBtn[0].classList.toggle('aside--action')
      section[0].classList.toggle('section--action')
    }
  }
}
</script>
<style lang="scss" scoped>
.jetl__aside{width:200px; position:absolute; top:0px; left:0px; z-index:10; height:100%; background:#444857; transition: .3s ease-in-out; -webkit-transition: .3s ease-in-out; -moz-transition: .3s ease-in-out; -ms-transition: .3s ease-in-out; -o-transition: .3s ease-in-out;
  &__contents{position:relative; height:100%;
    .jetl__aside__btn{position: absolute; top: 50%; right: -23px; z-index: 10; width: 23px; height:38px; text-align: center; padding: 10px 0px; cursor:pointer; background:#444857 url("../../assets/images/icon/aside_hide.svg") 6px center no-repeat; background-size:7px;}
    ul{padding-top:70px;
      li{background:#444857; color:#fff;
        &.jetl__aside__conetents--first{
          .router-link-active{background:#353b4e;}
        }
        a{height:50px; line-height:50px; color:inherit; display:block; text-indent:30px; font-family: "Noto"; font-weight:bold; font-size:15px; transition:none;
          &.router-link-active{background:#353b4e url(../../assets/images/icon/aside_down.svg) 157px center no-repeat; background-size:13px;
             & + .jetl__aside__contents__view{display:block;}
          }
        }
        .jetl__aside__contents__view{text-indent:40px; display:none;
          div{height:50px; line-height:50px; background:#282c38; font-size:15px;
            a{text-indent:40px; font-weight:normal;}
            .router-link-active{background: none; text-decoration: underline;}
          }
        }
      }
    }
  }
  /* 토글 액션 */
  &.aside--action{left:-200px;
    .jetl__aside__btn{background:#444857 url("../../assets/images/icon/aside_show.svg") 6px center no-repeat; background-size:7px;}
  }
  /* 토글 액션 */
}
</style>

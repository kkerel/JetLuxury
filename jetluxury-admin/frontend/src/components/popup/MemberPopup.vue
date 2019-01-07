<template>
  <div class="modal-mask">
    <div class="modal-wrapper">
      <div class="modal-container">
        <div class="layer-pop-widget">
          <div class="popup-widget">
            <div class="popup-contents">
              <div class="close" @click="saveRole()"><img src="../../assets/images/icon/close_btn.svg" alt=""></div>
              <div class="popup-inner-contnets">
                <div class="contents_title">&nbsp;&middot;&nbsp;권한 설정</div>
                <div class="search_contents box_type_01">
                  <div class="box_inner_wrap">
                    <div class="box_title">계정(이메일)</div>
                    <div class="box_contents">
                      <div>{{admin_id}}</div>
                    </div>
                  </div>
                  <div class="box_inner_wrap">
                  <div class="box_title">운영권한</div>
                  <div class="box_contents radio_style">
                    <div class="radio_wrap">
                      <input type="radio" name="check" id="allauthority" value="1" v-model="role" @change="changeRight()">
                      <label for="allauthority">전체권한</label>
                    </div>
                    <div class="radio_wrap">
                      <input type="radio" name="check" id="employee" v-model="role" value="2" @change="changeRight()">
                      <label for="employee">Employee</label>
                    </div>
                    <div class="radio_wrap">
                      <input type="radio" name="check" id="parttime" v-model="role" value="3" @change="changeRight()">
                      <label for="parttime">Part time</label>
                    </div>
                    <div class="radio_wrap">
                      <input type="radio" name="check" id="intern" v-model="role" value="4" @change="changeRight()">
                      <label for="intern">Intern</label>
                    </div>
                  </div>
                </div>
                </div>
                <div class="contents_title">&nbsp;&nbsp;접근 권한</div>
                <div class="authority_check_wrap" >
                  <div class="authority_contents">
                    <div class="check_title">
                      <input type="checkbox" id="defalutSetup" disabled v-model="basic">
                      <label for="defalutSetup">기본설정</label>
                    </div>
                    <ul>
                      <li>
                        <!--<input type="checkbox" id="admin">-->
                        <!--<label for="admin">운영자관리</label>-->
                        <label>운영자관리</label>
                      </li>
                      <li>
                        <!--<input type="checkbox" id="securityserver">-->
                        <!--<label for="securityserver">보안서버관리</label>-->
                        <label>보안서버관리</label>
                      </li>
                    </ul>
                  </div>
                  <div class="authority_contents">
                    <div class="check_title">
                      <input type="checkbox" id="product" disabled v-model="product">
                      <label for="product">상품</label>
                    </div>
                    <ul>
                      <li>
                        <!--<input type="checkbox" id="productmgm">-->
                        <!--<label for="productmgm">상품관리</label>-->
                        <label >상품관리</label>
                      </li>
                      <li>
                        <!--<input type="checkbox" id="searchmgm">-->
                        <!--<label for="searchmgm">검색창관리</label>-->
                        <label>검색창관리</label>
                      </li>
                    </ul>
                  </div>
                  <div class="authority_contents">
                    <div class="check_title">
                      <input type="checkbox" id="order" disabled v-model="order">
                      <label for="order">주문/배송</label>
                    </div>
                    <ul>
                      <li>
                        <!--<input type="checkbox" id="orderList">-->
                        <!--<label for="orderList">주문통합리스트</label>-->
                        <label>주문통합리스트</label>
                      </li>
                      <li>
                        <!--<input type="checkbox" id="paymentWaitList">-->
                        <!--<label for="paymentWaitList">결제대기리스트</label>-->
                        <label>결제대기리스트</label>
                      </li>
                      <li>
                        <!--<input type="checkbox" id="paymentComleteList">-->
                        <!--<label for="paymentComleteList">결제완료리스트</label>-->
                        <label>결제완료리스트</label>
                      </li>
                      <li>
                        <!--<input type="checkbox" id="productReadyList">-->
                        <!--<label for="productReadyList">상품준비리스트</label>-->
                        <label>상품준비리스트</label>
                      </li>
                      <li>
                        <!--<input type="checkbox" id="deliveryList">-->
                        <!--<label for="deliveryList">배송중리스트</label>-->
                        <label>배송중리스트</label>
                      </li>
                      <li>
                        <!--<input type="checkbox" id="deliveryCompleteList">-->
                        <!--<label for="deliveryCompleteList">배송완료리스트</label>-->
                        <label>배송완료리스트</label>
                      </li>
                      <li>
                        <!--<input type="checkbox" id="closeList">-->
                        <!--<label for="closeList">취소리스트</label>-->
                        <label>취소리스트</label>
                      </li>
                    </ul>
                  </div>
                  <div class="authority_contents">
                    <div class="check_title">
                      <input type="checkbox" id="member" disabled v-model="member">
                      <label for="member">회원</label>
                    </div>
                    <ul>
                      <li>
                        <!--<input type="checkbox" id="memberList">-->
                        <!--<label for="memberList">회원리스트</label>-->
                        <label>회원리스트</label>
                      </li>
                      <li>
                        <!--<input type="checkbox" id="dormancy">-->
                        <!--<label for="dormancy">휴면회원관리</label>-->
                        <label>휴면회원관리</label>
                      </li>
                      <li>
                        <!--<input type="checkbox" id="memberSecession">-->
                        <!--<label for="memberSecession">회원탈퇴/삭제</label>-->
                        <label>회원탈퇴/삭제</label>
                      </li>
                    </ul>
                  </div>
                  <div class="authority_contents">
                    <div class="check_title">
                      <input type="checkbox" id="board" disabled v-model="bullet">
                      <label for="board">게시판</label>
                      <label>게시판</label>
                    </div>
                    <ul>
                      <li>
                        <!--<input type="checkbox" id="faqCategory">-->
                        <!--<label for="faqCategory">FAQ카테고리</label>-->
                        <label>FAQ카테고리</label>
                      </li>
                      <li>
                        <!--<input type="checkbox" id="faqList">-->
                        <!--<label for="FaqList">FAQ리스트</label>-->
                        <label>FAQ리스트</label>
                      </li>
                      <li>
                        <!--<input type="checkbox" id="qnaList">-->
                        <!--<label for="qnaList">Q&A문의</label>-->
                        <label>Q&A문의</label>
                      </li>
                      <li>
                        <!--<input type="checkbox" id="question">-->
                        <!--<label for="question">1:1문의</label>-->
                        <label>1:1문의</label>
                      </li>
                    </ul>
                  </div>
                  <div class="authority_contents">
                    <div class="check_title">
                      <input type="checkbox" id="banner" disabled v-model="banner">
                      <label for="banner">배너</label>
                    </div>
                    <ul>
                      <li>
                        <!--<input type="checkbox" id="brandBanner">-->
                        <!--<label for="brandBanner">브랜드배너</label>-->
                        <label>브랜드배너</label>
                      </li>
                      <li>
                        <!--<input type="checkbox" id="eventBanner">-->
                        <!--<label for="eventBanner">이벤트배너</label>-->
                        <label>이벤트배너</label>
                      </li>
                    </ul>
                  </div>
                  <div class="authority_contents">
                    <div class="check_title">
                      <input type="checkbox" id="snsMgm" disabled v-model="SNS">
                      <label for="snsMgm">SNS관리</label>
                    </div>
                    <ul>
                      <li>
                        <!--<input type="checkbox" id="con01">-->
                        <!--<label for="con01">Con01</label>-->
                        <label>Con01</label>
                      </li>
                      <li>
                        <!--<input type="checkbox" id="con02">-->
                        <!--<label for="con02">Con02</label>-->
                        <label>Con02</label>
                      </li>
                      <li>
                        <!--<input type="checkbox" id="con03">-->
                        <!--<label for="con03">Con03</label>-->
                        <label>Con03</label>
                      </li>
                      <li>
                        <!--<input type="checkbox" id="con04">-->
                        <!--<label for="con04">Con04</label>-->
                        <label>Con04</label>
                      </li>
                      <li>
                        <!--<input type="checkbox" id="con05">-->
                        <!--<label for="con05">Con05</label>-->
                        <label>Con05</label>
                      </li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  export default {
      /*eslint-disable*/
    name: 'MemberPopup',
    props: {
      admin_id: String
    },
    data () {
      return {
        role: 1,
        product: true,
        basic: true,
        order: true,
        member: true,
        bullet: true,
        banner: true,
        SNS: true
      }
    },
    methods: {
      // changing the access right for each category based on the role of the operators
      changeRight()
      {
        if (this.role == 1)// if admin
        {
          this.basic = true
          this.product = true
          this.member = true
          this.bullet = true
        }
        else if (this.role == 2) {// if employee
          this.basic = false
          this.product = true
          this.member = true
          this.bullet = true
        }
        else if (this.role == 3)// if part time
        {
          this.basic = false
          this.product = false
          this.member = false
          this.bullet = true
        } else if (this.role == 4) //if intern
        {
          this.basic = false
          this.product = false
          this.member = false
          this.bullet = false
        }
      },
      saveRole() {
        this.$store.dispatch('saveRole', {role: this.role, admin_id: this.admin_id})
        this.$emit('close')
      }
    }
  }
</script>

<style lang="scss" scoped>
/* popup board */
@mixin board_style() {
  height:60px; line-height:63px; display:inline-block; vertical-align:middle; letter-spacing: 0px;
}
/* 모달 팝업 */
.modal-mask{ position: fixed; z-index: 9998; top: 0; left: 0; width: 100%; height: 100%; background-color: rgba(0, 0, 0, .6); display: table; transition: opacity .6s ease;
  .modal-wrapper{width: 100%; height: 100%; display: table; vertical-align: middle;
  .modal-container{display:table-cell; vertical-align:middle; border-radius: 2px; box-shadow: 0 2px 8px rgba(0, 0, 0, .33); transition: all .6s ease;}
    .layer-pop-widget {height:100%; position:relative; display: table; margin: 0 auto; z-index:100;
      .popup-widget{vertical-align:middle;
        .popup-contents{position:relative; width:100%;
          .close{text-align:right; margin-bottom:10px;
            img{width:30px;}
          }
          .popup-inner-contnets{background:#fff; padding:30px;
            .contents_title{font-weight:bold; font-size:20px;}
          }
        }
      }
    }
  }
}
.box_type_01{margin-bottom:20px;
  .box_inner_wrap{
    .box_contents{background:none;
      div{line-height:44px;}
    }
  }
}
.authority_check_wrap{width:100%; display:table; margin-top:20px; border-bottom:1px solid #ccc;
  .authority_contents{width:220px; float:left; text-align:center;
    .check_title{height:60px; line-height:60px; background:#444857; color:#fff; letter-spacing: -4px; border-right:1px solid #ccc;
      &:last-child{border-right:0px;}
      input{margin-right:6px;}
      input,label{@include board_style;}
    }
    ul{min-height:420px; border-right:1px solid #ccc;
      li{ letter-spacing:-4px;
        input{margin-right:6px;}
        input,label{@include board_style;}
      }
    }
  }
}
</style>

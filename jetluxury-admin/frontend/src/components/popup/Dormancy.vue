<template>
  <div class="modal-mask">
    <div class="modal-wrapper">
      <div class="modal-container">
        <div class="layer-pop-widget">
          <div class="popup-widget">
            <div class="popup-contents">
              <div class="close" @click="$emit('close')"><img src="../../assets/images/icon/close_btn.svg" alt=""></div>
              <div class="contents_title">&nbsp;&middot;&nbsp;권한 설정</div>
              <div class="search_contents box_type_01">
                <div class="box_inner_wrap">
                  <div class="box_title">계정(이메일)</div>
                  <div class="box_contents">
                    <div>admin_01_text@gmail.com</div>
                  </div>
                </div>
                <div class="box_inner_wrap">
                <div class="box_title">운영권한</div>
                <div class="box_contents">
                  <div class="radio_wrap">
                    <input type="radio" name="check" id="allauthority">
                    <label for="allauthority">전체권한</label>
                  </div>
                  <div class="radio_wrap">
                    <input type="radio" name="check" id="authoritychoice">
                    <label for="authoritychoice">권한선택</label>
                  </div>
                </div>
              </div>
              </div>
              <div class="contents_title">&nbsp;&middot;&nbsp;접근 권한</div>
              <div class="authority_check_wrap">
                <div class="authority_contents">
                  <div class="check_title">
                    <input type="checkbox" id="defalutSetup">
                    <label for="defalutSetup">기본설정</label>
                  </div>
                  <ul>
                    <li>
                      <input type="checkbox" id="admin">
                      <label for="admin">운영자관리</label>
                    </li>
                    <li>
                      <input type="checkbox" id="admin">
                      <label for="admin">보안서버관리</label>
                    </li>
                  </ul>
                </div>
                <div class="authority_contents">
                  <div class="check_title">
                    <input type="checkbox" id="defalutSetup">
                    <label for="defalutSetup">상품</label>
                  </div>
                  <ul>
                    <li>
                      <input type="checkbox" id="admin">
                      <label for="admin">상품관리</label>
                    </li>
                    <li>
                      <input type="checkbox" id="admin">
                      <label for="admin">검색창관리</label>
                    </li>
                  </ul>
                </div>
                <div class="authority_contents">
                  <div class="check_title">
                    <input type="checkbox" id="defalutSetup">
                    <label for="defalutSetup">주문/배송</label>
                  </div>
                  <ul>
                    <li>
                      <input type="checkbox" id="admin">
                      <label for="admin">주문통합리스트</label>
                    </li>
                    <li>
                      <input type="checkbox" id="admin">
                      <label for="admin">결제대기리스트</label>
                    </li>
                    <li>
                      <input type="checkbox" id="admin">
                      <label for="admin">결제완료리스트</label>
                    </li>
                    <li>
                      <input type="checkbox" id="admin">
                      <label for="admin">상품준비리스트</label>
                    </li>
                    <li>
                      <input type="checkbox" id="admin">
                      <label for="admin">배송중리스트</label>
                    </li>
                    <li>
                      <input type="checkbox" id="admin">
                      <label for="admin">배송완료리스트</label>
                    </li>
                    <li>
                      <input type="checkbox" id="admin">
                      <label for="admin">취소리스트</label>
                    </li>
                  </ul>
                </div>
                <div class="authority_contents">
                  <div class="check_title">
                    <input type="checkbox" id="defalutSetup">
                    <label for="defalutSetup">회원</label>
                  </div>
                  <ul>
                    <li>
                      <input type="checkbox" id="admin">
                      <label for="admin">회원리스트</label>
                    </li>
                    <li>
                      <input type="checkbox" id="admin">
                      <label for="admin">휴먼회원관리</label>
                    </li>
                    <li>
                      <input type="checkbox" id="admin">
                      <label for="admin">회원탈퇴/삭제</label>
                    </li>
                  </ul>
                </div>
                <div class="authority_contents">
                  <div class="check_title">
                    <input type="checkbox" id="defalutSetup">
                    <label for="defalutSetup">게시판</label>
                  </div>
                  <ul>
                    <li>
                      <input type="checkbox" id="admin">
                      <label for="admin">FAQ카테고리</label>
                    </li>
                    <li>
                      <input type="checkbox" id="admin">
                      <label for="admin">FAQ리스트</label>
                    </li>
                    <li>
                      <input type="checkbox" id="admin">
                      <label for="admin">Q&A문의</label>
                    </li>
                    <li>
                      <input type="checkbox" id="admin">
                      <label for="admin">1:1문의</label>
                    </li>
                  </ul>
                </div>
                <div class="authority_contents">
                  <div class="check_title">
                    <input type="checkbox" id="defalutSetup">
                    <label for="defalutSetup">배너</label>
                  </div>
                  <ul>
                    <li>
                      <input type="checkbox" id="admin">
                      <label for="admin">브랜드배너</label>
                    </li>
                    <li>
                      <input type="checkbox" id="admin">
                      <label for="admin">이벤트배너</label>
                    </li>
                  </ul>
                </div>
                <div class="authority_contents">
                  <div class="check_title">
                    <input type="checkbox" id="defalutSetup">
                    <label for="defalutSetup">SNS관리</label>
                  </div>
                  <ul>
                    <li>
                      <input type="checkbox" id="admin">
                      <label for="admin">Con01</label>
                    </li>
                    <li>
                      <input type="checkbox" id="admin">
                      <label for="admin">Con01</label>
                    </li>
                    <li>
                      <input type="checkbox" id="admin">
                      <label for="admin">Con01</label>
                    </li>
                    <li>
                      <input type="checkbox" id="admin">
                      <label for="admin">Con01</label>
                    </li>
                    <li>
                      <input type="checkbox" id="admin">
                      <label for="admin">Con01</label>
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
</template>

<script>
  export default {
    name: 'MemberPopup',
    data () {
      return {
      }
    }
  }
</script>

<style lang="scss" scoped>
/* 모달 팝업 */
.modal-mask{ position: fixed; z-index: 9998; top: 0; left: 0; width: 100%; height: 100%; background-color: rgba(0, 0, 0, .6); display: table; transition: opacity .6s ease;
  .modal-wrapper{width: 100%; height: 100%; display: table; vertical-align: middle;
  .modal-container{display:table-cell; vertical-align:middle; border-radius: 2px; box-shadow: 0 2px 8px rgba(0, 0, 0, .33); transition: all .6s ease;}
    .layer-pop-widget {height:100%; position:relative; display: table; margin: 0 auto; z-index:100;
      .popup-widget{display:table-cell; vertical-align:middle;
        .popup-contents{position:relative; width:100%; background:#fff; padding:30px;
          .close{position:absolute; top:-40px; right:0px; cursor:pointer;
            img{width:30px;}
          }
          .contents_title{font-weight:bold; font-size:20px;}
        }
      }
    }
  }
}
.box_type_01{margin-bottom:20px;
  .box_inner_wrap{
    .box_contents{background:none;
      div{line-height:44px;}
      .radio_wrap{letter-spacing:-4px;
        input{margin-right:6px;}
        input,label{height:44px; line-height:44px; display:inline-block; vertical-align:middle; letter-spacing: 0px; cursor:pointer;}
      }
    }
  }
}
.authority_check_wrap{width:100%; display:table; margin-top:20px; border-bottom:1px solid #ccc;
  .authority_contents{width:220px; float:left; text-align:center;
    .check_title{height:60px; line-height:60px; background:#444857; color:#fff; letter-spacing: -4px; border-right:1px solid #ccc;
      &:last-child{border-right:0px;}
      input{margin:23px 6px 23px 0px;}
      input,label{display:inline-block; vertical-align:top; letter-spacing: 0px;}
    }
    ul{min-height:420px; border-right:1px solid #ccc;
      li{height:60px; line-height:60px; letter-spacing:-4px;
        input{margin:23px 6px 23px 0px;}
        input,label{display:inline-block; vertical-align:top; letter-spacing: 0px;}
      }
    }
  }
}
</style>

<template>
  <div class="modal-mask">
    <div class="modal-wrapper">
      <div class="modal-container">
        <div class="layer-pop-widget">
          <div class="popup-widget">
            <div class="popup-contents">
              <div class="close" @click="$emit('close')"><img src="../../assets/images/icon/close_btn.svg" alt=""></div>
              <div>
                <div>
                  <h3>[휴면회원] 휴면회원이란 무엇인가요?</h3>
                  <p>정보통신망법 제29조 2항(개인정보유효기간제)에 따라, 1년이상 서비스를 이용하지 않은 회원의 정보는 자동으로 휴면상태로 보관되며 이를 휴면회원이라고 합니다.</p>
                  <p>분리보관중인 휴면회원에게 메일이나 SMS를 발송하실 수 없으며, 휴면회원 정보는 관련 업무 담당자만 열람하도록 권한을 제한하시기 바랍니다.</p>
                  <p>휴면회원 관리화면에서 분리보관중인 휴면회원 정보를 확인하실 수 있습니다.</p>
                </div>
                <div class="bottom_section">
                  <h3>[휴면회원전환일] 휴면회원전환일이란 무엇인가요?</h3>
                  <p>휴면회원이 쇼핑몰에 마지막으로 로그인한 지 1년(또는 별도로 정한 기간)경과 시 휴면회원으로 전환된 날짜를 말합니다.</p>
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
    name: 'PolicyPopup',
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
        .popup-contents{position:relative; width:100%; background:#fff; padding:60px;
          .close{position:absolute; top:-40px; right:0px; cursor:pointer;
            img{width:30px;}
          }
          h3{padding-bottom:20px;}
          p{line-height:1.75;}
          .bottom_section{padding-top:40px;}
        }
      }
    }
  }
}
</style>

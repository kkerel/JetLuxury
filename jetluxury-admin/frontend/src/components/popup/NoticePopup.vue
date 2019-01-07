<template>
  <div class="modal-mask">
    <div class="modal-wrapper">
      <div class="modal-container">
        <div class="layer-pop-widget">
          <div class="popup-widget">
            <div class="popup-contents">
              <div class="popup_prologue">
                <p>{{ popup.prologue }}</p>
              </div>
              <div class="popup-btn">
                <button type="button" @click="$emit('close')">확인</button>
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
    name: 'NoticePopup',
    data () {
      return {
      }
    },
    props: {
      popup: {
        type: Object,
        default () {
          return {
            prologue: 'prologue'
          }
        }
      }
    }
  }
</script>

<style lang="scss" scoped>
/* 모달 팝업 */
.modal-mask{ position: fixed; z-index: 9998; top: 0; left: 0; width: 100%; height: 100%; background-color: rgba(0, 0, 0, .6); display: table; transition: opacity .6s ease;
  .modal-wrapper{width: 100%; height: 100%; display: table; vertical-align: middle;
  .modal-container{display:table-cell; vertical-align:middle; border-radius: 2px; box-shadow: 0 2px 8px rgba(0, 0, 0, .33); transition: all .6s ease;}
    .layer-pop-widget {height:100%; position:relative; display: table; margin: 0 auto; width: 332px; z-index:100;
      .popup-widget{display:table-cell; vertical-align:middle;
        .popup-contents{background:#fff;
          .popup_prologue{font-size:14px; font-weight:normal; color:#333; padding:30px; text-align:center;}
          .popup-btn{width:100%; display:table; border-top:1px solid #ccc; letter-spacing:-4px;
            button{width:100%; height:50px; line-height:50px; display:table-cell; letter-spacing:0px; font-size:14px; color:#333;}
          }
        }
      }
    }
  }
}
</style>

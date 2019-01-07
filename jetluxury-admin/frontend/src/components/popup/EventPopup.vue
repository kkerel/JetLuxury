<template>
  <div class="modal-mask">
    <transition name='modal'>
      <NoticePopup :popup="popup" v-if="savePop" @close="savePop = false"></NoticePopup>
    </transition>
    <div class="modal-wrapper">
      <div class="modal-container">
        <div class="layer-pop-widget">
          <div class="popup-widget">
            <div class="popup-contents">
              <div class="close" @click="$emit('close')"><img src="../../assets/images/icon/close_btn.svg" alt=""></div>
              <div class="title_wrap">
                <div class="contents_title">&nbsp;&middot;&nbsp;이벤트배너 등록</div>
                <div class="btn_type_01" @click="savePop = true">저장</div>
              </div>
              <div class="search_contents box_type_01">
                <div class="box_inner_wrap">
                  <!-- event -->
                  <div class="box">
                    <div class="box_title">이벤트명</div>
                    <div class="box_contents">
                      <p>vans</p>
                    </div>
                  </div>
                  <!-- //event -->
                  <!-- page -->
                  <div class="box">
                    <div class="box_title">페이지</div>
                    <div class="box_contents">
                      <p>Event</p>
                    </div>
                  </div>
                  <!-- page -->
                </div>
                <div class="box_inner_wrap">
                  <div class="box">
                    <div class="box_title">메인노출여부</div>
                    <div class="box_contents">
                      <div class="process_choice_wrap">
                        <ul>
                          <li>
                            <input type="radio" name="process" id="exposure" checked>
                            <label for="exposure">메인노출</label>
                          </li>
                          <li>
                            <input type="radio" name="process" id="Unexamined">
                            <label for="Unexamined">메인비노출</label>
                          </li>
                        </ul>
                      </div>
                    </div>
                  </div>
                  <div class="box">
                    <div class="box_title">등록일</div>
                    <div class="box_contents">
                      <p>2018-10-10</p>
                    </div>
                  </div>
                </div>
                <div class="box_inner_wrap">
                  <div class="box full_box">
                    <div class="box_title">배너 기본형</div>
                    <div class="box_contents">
                      <p><input type="file" id="file"></p>
                    </div>
                  </div>
                </div>
                <div class="box_inner_wrap">
                  <div class="box full_box">
                    <div class="box_title">배너 확대형</div>
                    <div class="box_contents">
                      <p><input type="file" id="file"></p>
                    </div>
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
  import NoticePopup from 'components/popup/NoticePopup'
  export default {
    name: 'BrandPopup',
    components: {
      NoticePopup
    },
    data () {
      return {
        savePop: false,
        popup: {
          prologue: '저장 되었습니다.'
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
      .layer-pop-widget {height:100%; position:relative; display: table; margin: 0 auto; z-index:100;
        .popup-widget{display:table-cell; vertical-align:middle;
          .popup-contents{position:relative; width:1600px; background:#fff; padding:30px;
            .close{position:absolute; top:-40px; right:0px; cursor:pointer;
              img{width:30px;}
            }
            .contents_title{padding:8px 0px; font-weight:bold; font-size:20px;}
          }
        }
      }
    }
  }
  .search_contents{
    .box_inner_wrap{width:100%; display:table;
      .box{position:relative; float:left; width:50%;}
      .full_box{width:100%; float:none;}
      .box_contents{background:#fff;
        p{background:#fff; letter-spacing:0px; line-height:68px; font-size:14px;}
      }
    }
  }
  .title_wrap{width:100%; height:43px; display:table; position:relative;
    .btn_type_01{position:absolute; top:0px; right:0px; z-index:10;}
  }
  .process_choice_wrap{margin:0px!important; line-height:67px;
    ul{
      li{display:inline-block;
        &:first-child{margin-right:30px;}
        input{display:inline-block; margin-right:6px;}
        label{display:inline-block;}
      }
    }
  }
</style>

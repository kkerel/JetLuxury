<template>
  <div class="modal-mask">
    <transition name='modal'>
      <NoticePopup :popup="popup" v-if="savePop" @close="savePop = false"></NoticePopup>
    </transition>
    <div class="modal-wrapper">
      <div class="modal-container">
        <div class="layer-pop-widget">
          <div class="popup-widget">
            <div class="close" @click="$emit('close')"><img src="../../assets/images/icon/close_btn.svg" alt=""></div>
            <div class="popup-contents">
              <div class="title_wrap">
                <div class="contents_title">&nbsp;&middot;&nbsp;1:1문의답변</div>
                <div class="btn_type_01" @click="savePop = true">저장</div>
              </div>
              <div class="search_contents box_type_01">
                <div class="box_inner_wrap">
                  <div class="box">
                    <div class="box_title">작성회원</div>
                    <div class="box_contents">
                      <p>작성아이디@gmail.com</p>
                    </div>
                  </div>
                  <div class="box">
                    <div class="box_title">등록일</div>
                    <div class="box_contents">
                      <p>2018-10-10 15:30</p>
                    </div>
                  </div>
                </div>
                <div class="box_inner_wrap">
                  <div class="box">
                    <div class="box_title">상품번호</div>
                    <div class="box_contents">
                      <div class="process_choice_wrap">
                        <p>123456</p>
                      </div>
                    </div>
                  </div>
                  <div class="box">
                    <div class="box_title">상품명</div>
                    <div class="box_contents">
                      <p>여성 원피스</p>
                    </div>
                  </div>
                </div>
                <div class="box_inner_wrap">
                  <div class="box full_box">
                    <div class="box_title">문의유형</div>
                    <div class="box_contents">
                      <p>상품문의</p>
                    </div>
                  </div>
                </div>
                <div class="box_inner_wrap">
                  <div class="box full_box">
                    <div class="box_title">질문제목</div>
                    <div class="box_contents">
                      <p><input type="text"></p>
                    </div>
                  </div>
                </div>
                <div class="box_inner_wrap textarea_wrap">
                  <div class="box full_box">
                    <div class="box_title">질문내용</div>
                    <div class="box_contents">
                      <textarea></textarea>
                    </div>
                  </div>
                </div>
                <div class="box_inner_wrap">
                  <div class="box full_box">
                    <div class="box_title">첨부이미지</div>
                    <div class="box_contents">
                      <ul class="attachment_image_wrap">
                        <li><input type="file"></li>
                        <li><input type="file"></li>
                        <li><input type="file"></li>
                        <li><input type="file"></li>
                      </ul>
                    </div>
                  </div>
                </div>
                <div class="box_inner_wrap">
                  <div class="box">
                    <div class="box_title">작성관리자</div>
                    <div class="box_contents">
                      <p>text@gmail.com</p>
                    </div>
                  </div>
                  <div class="box">
                    <div class="box_title">답변상태</div>
                    <div class="box_contents">
                      <div class="product_name">답변완료</div>
                    </div>
                  </div>
                </div>
                <div class="box_inner_wrap textarea_wrap">
                  <div class="box full_box">
                    <div class="box_title">답변작성</div>
                    <div class="box_contents">
                      <textarea></textarea>
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
          .close{cursor:pointer; float:right; padding-bottom:13px;
             img{width:30px;}
          }
          .popup-contents{position:relative; width:1600px; height:750px; overflow-y:scroll; background:#fff; padding:30px; clear:both;
            .contents_title{padding:8px 0px; font-weight:bold; font-size:20px;}
          }
        }
      }
    }
  }
  .search_contents{
    .box_inner_wrap{width:100%; display:table;
      .box{position:relative; float:left; width:50%;}
      .full_box{width:100%; display:table; float:none;}
      .box_contents{background:#fff; padding-right:14px;
        p{background:#fff; letter-spacing:0px; line-height:68px; font-size:14px;
          input{width: 100%; height: 44px; line-height: 44px; border: 1px solid #ccc; background-color: #f5f5f5; text-indent:10px;}
        }
        .attachment_image_wrap{letter-spacing:-5px; padding:22px 0px;
          li{width:25%; display:inline-block; vertical-align:middle; letter-spacing: 0px;}
        }
        .product_name{width:160px; line-height:44px; font-size:16px; border: 1px solid #cccccc; background-color: #f5f5f5; color:#333; text-indent:10px;}
      }
    }
  }
  .title_wrap{width:100%; height:43px; display:table; position:relative;
    .btn_type_01{position:absolute; top:0px; right:0px; z-index:10;}
  }
  .process_choice_wrap{margin:0px!important; line-height:67px; height:68px!important;
    ul{
      li{display:inline-block;
        &:first-child{margin-right:30px;}
        input{display:inline-block; margin-right:6px;}
        label{display:inline-block;}
      }
    }
  }
  .textarea_wrap{
    .box{
      .box_title{height:169px; line-height:169px;}
      .box_contents{height:170px;
        textarea{width:100%; height:143px; margin:13px 0px; border:1px solid #ccc; background-color:#f5f5f5; font-size:16px; padding:10px;}
      }
    }
  }
</style>

<template>
  <div class="modal-mask">
    <div class="modal-wrapper">
      <div class="modal-container">
        <div class="layer-pop-widget">
          <div class="popup-widget">
            <div class="close" @click="$emit('close')"><img src="../../assets/images/icon/close_btn.svg" alt=""></div>
            <div class="popup-contents">
              <div class="title_wrap">
                <div class="contents_title">&nbsp;&middot;&nbsp;관리자메모</div>
                <div class="btn_type_01" @click="savePop = true">저장</div>
              </div>
              <div class="contents_wrap box_type_01">
                <div class="box_inner_wrap">
                  <div class="box">
                    <div class="box_title">주문번호</div>
                    <div class="box_contents">
                      <p>126378</p>
                    </div>
                  </div>
                </div>
                <div class="box_inner_wrap">
                  <div class="box">
                    <div class="box_title">상품번호</div>
                    <div class="box_contents">
                      <div class="process_choice_wrap">
                        <p>2018-10-10 15:10:20</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div class="contents_wrap box_type_01 memo_contents_wrap">
                <div class="box_inner_wrap">
                  <div class="box">
                    <div class="box_title">메모유형</div>
                    <div class="box_contents">
                      <p>126378</p>
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
              </div>
              <div class="contents_wrap last_contents">
                <table class="table_type">
                  <colgroup>
                    <col width="176px">
                    <col width="334px">
                    <col width="152px">
                    <col width="674px">
                    <col width="200px">
                  </colgroup>
                  <tr>
                    <th>작성일</th>
                    <th>작성자</th>
                    <th>메모구분</th>
                    <th>메모내용</th>
                    <th>수정/삭제</th>
                  </tr>
                  <tr>
                    <td>2018-10-10 15:10:20</td>
                    <td>
                      <span>admin_01_test@gmail.com</span>
                      <span>(전체관리자)</span>
                    </td>
                    <td>접수</td>
                    <td>메모에 내용을 깅비하면 해당영역에 노출됩니다.</td>
                    <td>
                      <button type="button" class="btn_type_04">수정</button>
                      <button type="button" class="btn_type_03">삭제</button>
                    </td>
                  </tr>
                  <tr>
                    <td>2018-10-10 15:10:20</td>
                    <td>
                      <span>admin_01_test@gmail.com</span>
                      <span>(전체관리자)</span>
                    </td>
                    <td>접수</td>
                    <td>메모에 내용을 깅비하면 해당영역에 노출됩니다.</td>
                    <td>
                      <button type="button" class="btn_type_05">수정완료</button>
                    </td>
                  </tr>
                </table>
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
    name: 'BrandPopup',
    components: {
    }
  }
</script>

<style lang="scss" scoped>
  /* 모달 팝업 */
  .modal-mask{ position: fixed; z-index: 9998; top: 0; left: 0; width: 100%; height: 100%; background-color: rgba(0, 0, 0, .6); display: table; transition: opacity .6s ease;
    .modal-wrapper{width: 100%; height: 100%; display: table; vertical-align: middle;
      .modal-container{display:table-cell; vertical-align:middle; border-radius: 2px; box-shadow: 0 2px 8px rgba(0, 0, 0, .33); transition: all .6s ease;}
      .layer-pop-widget {height:100%; position:relative; display: table; margin: 0 auto; z-index:100;
        .popup-widget{vertical-align:middle;
          .close{float:right; padding-bottom:13px; cursor:pointer;
            img{width:30px;}
          }
          .popup-contents{position:relative; width:1600px; background:#fff; padding:30px; clear:both;
            .contents_title{padding:8px 0px; font-weight:bold; font-size:20px;}
          }
        }
      }
    }
  }
  .contents_wrap{
    &.last_contents{margin-top:20px; padding-top:20px; border-top:1px solid #ccc;}
    &.memo_contents_wrap{padding-top:20px;
      > .box_inner_wrap{border-top:1px solid #ccc;}
    }
    table{
      td{font-size:16px; height:80px;}
    }
    .box_inner_wrap{width:100%; display:table;
      .full_box{width:100%; float:none; display:table;}
      .box_contents{background:#fff; padding-right:14px;
        p{background:#fff; letter-spacing:0px; line-height:68px; font-size:16px;
          input{width: 100%; height: 44px; line-height: 44px; border: 1px solid #ccc; background-color: #f5f5f5; text-indent:10px;}
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
  .textarea_wrap{border-top:0px!important;
    .box{
      .box_title{height:169px; line-height:169px;}
      .box_contents{height:170px;
        textarea{width:100%; height:143px; margin:13px 0px; border:1px solid #ccc; font-size:16px; padding:10px;}
      }
    }
  }

</style>

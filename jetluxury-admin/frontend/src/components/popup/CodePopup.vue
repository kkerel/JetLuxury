<template>
  <div class="modal-mask">
    <div class="modal-wrapper">
      <div class="modal-container">
        <div class="layer-pop-widget">
          <div class="popup-widget">
            <div class="popup-contents">
              <div class="close" @click="$emit('close')"><img src="../../assets/images/icon/close_btn.svg" alt=""></div>
              <div class="title_wrap">
                <div class="contents_title">&nbsp;&middot;&nbsp;치환코드 보기</div>
              </div>
              <div class="search_contents">
                <table>
                  <colgroup>
                    <col width="70px">
                    <col width="178px">
                    <col width="179px">
                  </colgroup>
                  <tr>
                    <th>번호</th>
                    <th>치환코드</th>
                    <th>브랜드배너</th>
                  </tr>
                  <tr>
                    <td>1</td>
                    <td>code</td>
                    <td>brandbanner</td>
                  </tr>
                  <tr>
                    <td>2</td>
                    <td>code</td>
                    <td>brandbanner</td>
                  </tr>
                  <tr>
                    <td>3</td>
                    <td>code</td>
                    <td>brandbanner</td>
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
          .popup-contents{position:relative; background:#fff; padding:30px;
            .close{position:absolute; top:-40px; right:0px; cursor:pointer;
              img{width:30px;}
            }
            .contents_title{font-weight:bold; font-size:20px;}
            .search_contents{margin-top:20px;}
          }
        }
      }
    }
  }
</style>

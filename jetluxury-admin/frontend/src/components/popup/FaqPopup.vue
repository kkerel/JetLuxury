<template>
  <div class="modal-mask">
    <div class="modal-wrapper">
      <div class="modal-container">
        <div class="layer-pop-widget">
          <div class="popup-widget">
            <div class="close" @click="$emit('close')"><img src="../../assets/images/icon/close_btn.svg" alt=""></div>
            <div class="popup-contents">
              <div class="title_wrap">
                <h3><span>&nbsp;&middot;&nbsp;FAQ&nbsp;등록</span></h3>
                <div class="popup-btn">
                  <button type="button" @click="save()" class="btn_type_01">저장</button>
                </div>
              </div>
              <div class="search_contents box_type_01">
                <!-- 대분류 -->
                <div class="box_inner_wrap">
                  <div class="box">
                    <div class="box_title">대분류</div>
                    <div class="box_contents">
                      <div>
                        <!--
                        Component paths below ↓↓↓↓  from 'components/ui/SearchSelect'
                       -->
                        <SearchSelect class="select" :items="searchOptions1" :initValue="searchOption1"
                                      @change="changeSearchOption"/>
<!--
                        <input type="text" class="input_type_s" placeholder="회원이메일">
-->
                      </div>
                    </div>
                  </div>
                </div>
                <!-- 대분류 -->
                <!-- 중분류 -->
                <div class="box_inner_wrap">
                  <div class="box">
                    <div class="box_title">중분류</div>
                    <div class="box_contents">

                      <!--
                        Component paths below ↓↓↓↓  from 'components/ui/SearchSelect'
                       -->
                      <SearchSelect class="select" :items="searchOptions2" :initValue="searchOption2"
                                    @change="changeSearchOption"/>

                      <!--
                      <div><input type="text" class="input_type_s" placeholder="회원이메일"></div>
                      -->
                    </div>
                  </div>
                </div>
                <!-- 중분류 -->
              </div>
              <div class="text_contents box_type_01">
                <!-- 질문내용 -->
                <div class="box_inner_wrap">
                  <div class="box">
                    <div class="box_title">질문내용</div>
                    <div class="box_contents">
                      <div><input type="text" class="input_type_s" placeholder="텍스트를 작성하세요"></div>
                    </div>
                  </div>
                </div>
                <!-- 질문내용 -->
                <!-- 중분류 -->
                <div class="box_inner_wrap textarea_wrap">
                  <div class="box">
                    <div class="box_title">중분류</div>
                    <div class="box_contents">
                      <textarea placeholder="텍스트를 작성하세요"></textarea>
                    </div>
                  </div>
                </div>
                <!-- 중분류 -->
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  import SearchSelect from 'components/ui/SearchSelect'
  const SEARCH_OPTIONS1 = [
      {name: '브랜드명', value: 'brand_name'},
      {name: '브랜드국가', value: 'brand_coname'}
  ]
  const SEARCH_OPTIONS2 = [
      {name: '브랜드명', value: 'brand_name'},
      {name: '브랜드국가', value: 'brand_coname'}
  ]
  export default {
    name: 'FaqPopup',
    components: {
      SearchSelect
    },
    data () {
      return {
        SubTitle: {
          title: 'FAQ등록'
        },
        searchOptions1: SEARCH_OPTIONS1, // values for the select box
        searchOptions2: SEARCH_OPTIONS2, // values for the select box
        searchOption1: SEARCH_OPTIONS1[0].value, // default value for the select box
        searchOption2: SEARCH_OPTIONS2[0].value // default value for the select box
      }
    },
    methods: {
      changeSearchOption1 (option1) {

      },
      changeSearchOption2 (option2) {

      },
      save () {
        // 1.call api and save your dat
        // 2. close the popup
        this.$emit('close')
      }
    }
  }
</script>

<style lang="scss" scoped>
/* 모달 팝업 */
.modal-mask{ position: fixed; z-index: 9998; top: 0; left: 0; width: 100%; height: 100%; background-color: rgba(0, 0, 0, .6); display: table; transition: opacity .6s ease;
  .modal-wrapper{width: 100%; height: 100%; display: table; vertical-align: middle;
  .modal-container{display:table-cell; vertical-align:middle; border-radius: 2px; box-shadow: 0 2px 8px rgba(0, 0, 0, .33); transition: all .6s ease;}
    .layer-pop-widget {height:100%; position:relative; display: table; margin: 0 auto; width: 1600px; z-index:100;
      .popup-widget{display:table-cell; vertical-align:middle;
        .close{cursor:pointer; float:right; padding-bottom:13px;
          img{width:30px;}
        }
        .popup-contents{width:100%; display:table; background:#fff; padding:30px;
          .title_wrap{position:relative;
            h3{padding:10.5px 0px; font-size:20px;}
            .popup-btn{position:absolute; top:0px; right:0px; z-inedx:10;}
          }
          .popup_prologue{font-size:14px; font-weight:normal; color:#333; padding:30px; text-align:center;}
          .search_contents{padding-bottom:20px;border-bottom:1px solid #ccc;}
          .text_contents{
            .textarea_wrap{height:246px;
              .box_title{height:246px; line-height:246px;}
              .box_contents{padding:12px 12px 12px 214px;
                textarea{width:100%; height:220px; background:#fff; border: 1px solid #ccc; font-size:14px; padding:10px; vertical-align:middle;}
              }
            }
          }
          .box_inner_wrap{width:100%; height:auto; display:table;
            .box{width:100%; display:table;
              .box_title{position:static; height:100%; display:table-cell; vertical-align:middle;}
              .box_contents{padding:13px; height:auto; display:table-cell; vertical-align:middle;}
            }
          }
        }
      }
    }
  }
}
</style>

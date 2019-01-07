<template>
  <div class="contents_wrap">
    <transition name='modal'>
      <!--
        Component paths below ↓↓↓↓  from 'components/popup/CodePopup'
      -->
      <CodePopup v-if="popupStatus" @close="popupStatus = false"></CodePopup>
    </transition>
    <!--
      Component paths below ↓↓↓↓  from 'components/ui/PageTitle'
    -->
    <PageTitle :page="page"/>
    <section class="contents">
      <div class="search_wrap">
        <!-- 카카오 사용 설정 -->
        <div class="title_wrap first_title_wrap">
          <!--
            Component paths below ↓↓↓↓  from 'components/ui/PageSubTitle'
          -->
          <PageSubTitle :SubTitle="SubTitle"/>
        </div>
        <div class="search_contents box_type_01 center_border">
          <div class="box_inner_wrap">
            <div class="box">
              <div class="box_title">앱키(Javascript 키)</div>
              <div class="box_contents">
                <div class="app_key">
                  <input type="text" class="input_type_s">
                  <p>developers.kakao.com</p>
                  <p>사이트에서 앱 키를 확인 후 입력</p>
                </div>
              </div>
            </div>
          </div>
          <div class="box_inner_wrap">
            <div class="box">
              <div class="box_title">링크 공유하기 설정</div>
              <div class="box_contents">
                <div class="process_choice_wrap">
                  <ul class="radio_style">
                    <li>
                      <input type="radio" name="link" id="link_use" checked>
                      <label for="link_use">사용함</label>
                    </li>
                    <li>
                      <input type="radio" name="link" id="link_unuse">
                      <label for="link_unuse">사용안함</label>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
          <div class="box_type_wrap">
            <div class="box_title">링크 공유문구 설정</div>
            <div class="box_contents">
              <div class="box_inner">
                <div class="box_inner_text_title">라벨텍스트</div>
                <div class="box_inner_text_contents">
                  <textarea></textarea>
                  <div class="label_prologue">
                    <p>검색 페이지 내 인기 검색어를 노출하여 주력상품, 이벤트상품 등을 검색할 수 있도록 유도합니다.</p>
                    <p>1,000자 이상 입력되는 경우 상품명 치환코드 사용시 상품명을 줄여 등록하거나 내용 뒷부분이 삭제됩니다.</p>
                  </div>
                </div>
              </div>
              <div class="box_inner last_inner">
                <div class="box_inner_input_title">버튼텍스트</div>
                <div class="box_inner_input_contents">
                  <input type="text">
                </div>
              </div>
            </div>
          </div>
        </div>
        <div class="search_contents box_type_01">
          <div class="box_inner_wrap">
            <div class="box">
              <div class="box_title">카카오스토리 <br>공유하기 설정</div>
              <div class="box_contents">
                <div class="process_choice_wrap">
                  <ul class="radio_style">
                    <li>
                      <input type="radio" name="kakao" id="kakao_use" checked>
                      <label for="kakao_use">사용함</label>
                    </li>
                    <li>
                      <input type="radio" name="kakao" id="kakao_unuse">
                      <label for="kakao_unuse">사용안함</label>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
          <div class="box_type_wrap">
            <div class="box_title">
              <p>카카오스토리 <br>공유문구 설정</p>
              <button class="btn_type_02" @click="popupStatus = true">치환코드보기</button>
            </div>
            <div class="box_contents">
              <div class="box_inner">
                <div class="box_inner_text_title">기본전송메세지</div>
                <div class="box_inner_text_contents">
                  <textarea></textarea>
                  <div class="label_prologue">
                    <p>검색 페이지 내 인기 검색어를 노출하여 주력상품, 이벤트상품 등을 검색할 수 있도록 유도합니다.</p>
                    <p>1,000자 이상 입력되는 경우 상품명 치환코드 사용시 상품명을 줄여 등록하거나 내용 뒷부분이 삭제됩니다.</p>
                  </div>
                </div>
              </div>
              <div class="box_inner">
                <div class="box_inner_input_title">링크타이틀</div>
                <div class="box_inner_input_contents">
                  <input type="text">
                </div>
              </div>
              <div class="box_inner last_inner">
                <div class="box_inner_input_title">링크요약</div>
                <div class="box_inner_input_contents">
                  <input type="text">
                </div>
              </div>
            </div>
          </div>
        </div>
        <!-- // 카카오 사용 설정 -->
        <!-- 페이스북 사용 설정 -->
        <div class="title_wrap">
          <!--
            Component paths below ↓↓↓↓  from 'components/ui/PageSubTitle'
          -->
          <PageSubTitle :SubTitle="FacebookTitle"/>
        </div>
        <div class="search_contents box_type_01">
          <div class="box_inner_wrap">
            <div class="box">
              <div class="box_title">페이스북<br>공유하기 설정</div>
              <div class="box_contents">
                <div class="process_choice_wrap">
                  <ul class="radio_style">
                    <li>
                      <input type="radio" name="facebook" id="facebook_use" checked>
                      <label for="facebook_use">사용함</label>
                    </li>
                    <li>
                      <input type="radio" name="facebook" id="facebook_unuse">
                      <label for="facebook_unuse">사용안함</label>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
          <div class="box_type_wrap">
            <div class="box_title">공유문구 설정</div>
            <div class="box_contents">
              <div class="box_inner">
                <div class="box_inner_input_title">링크타이틀</div>
                <div class="box_inner_input_contents">
                  <input type="text">
                </div>
              </div>
              <div class="box_inner last_inner">
                <div class="box_inner_input_title">링크요약</div>
                <div class="box_inner_input_contents">
                  <input type="text">
                </div>
              </div>
            </div>
          </div>
        </div>
        <!-- // 페이스북 사용 설정 -->
        <!-- 상품 URL 복사 사용 설정 -->
        <div class="title_wrap">
          <!--
           Component paths below ↓↓↓↓  from 'components/ui/PageSubTitle'
          -->
          <PageSubTitle :SubTitle="ProductTitle"/>
        </div>
        <div class="search_contents box_type_01">
          <div class="box_inner_wrap">
            <div class="box">
              <div class="box_title">페이스북<br>공유하기 설정</div>
              <div class="box_contents">
                <div class="process_choice_wrap">
                  <ul class="radio_style">
                    <li>
                      <input type="radio" name="url" id="url_use" checked>
                      <label for="url_use">사용함</label>
                    </li>
                    <li>
                      <input type="radio" name="url" id="url_unuse">
                      <label for="url_unuse">사용안함</label>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </div>
        <!-- // 상품 URL 복사 사용 설정 -->
      </div>
    </section>
  </div>
</template>

<script>
  import PageTitle from 'components/ui/PageTitle'
  import PageSubTitle from 'components/ui/PageSubTitle'
  import CodePopup from 'components/popup/CodePopup'
  export default {
    name: 'setup',
    components: {
      PageTitle,
      PageSubTitle,
      CodePopup
    },
    data () {
      return {
        popupStatus: false,
        page: {
          title: 'SNS관리',
          subTitle: 'SNS공유설정'
        },
        SubTitle: {
          title: '카카오 사용 설정'
        },
        FacebookTitle: {
          title: '페이스북 사용 설정'
        },
        ProductTitle: {
          title: '상품URL 복사 사용 설정'
        }
      }
    }
  }
</script>

<style lang="scss" scoped>
  @mixin inlineBlock() {
    display:inline-block;
    vertical-align:middle;
    letter-spacing:0px;
  }
  .contents_wrap {
    .contents {
      input{text-indent:10px;}
      .search_wrap{width:100%; display:table;
        .first_title_wrap{margin-top:0px;}
        .title_wrap{width:100%; display:table; margin-top:40px;
          h3{float:left;}
          .btn_type_01{float:right;}
        }
        .search_contents{
          &.center_border{border-bottom:1px solid #ccc; padding-bottom:20px;}
          .box_inner_wrap{
            .box{width:100%; display:table;
              .box_title{
               &.title_type01{height:346px; line-height:346px;}
              }
              .box_contents{
                > div{height:auto;}
                .app_key{letter-spacing: -4px;
                  input{@include inlineBlock;}
                  p{margin-left:10px; @include inlineBlock; color:#333;
                    &:last-child{color:#888;}
                  }
                }
                .process_choice_wrap{height:68px; line-height:68px; padding:0px; margin:0px;
                  ul{
                    li{float:left; padding-right:30px;
                      label{display:inline-block; vertical-align:middle;}
                    }
                  }
                }
              }
            }
          }
          .box_type_wrap{width:100%; display:table; border-bottom:1px solid #ccc;
            .box_title{width:200px; background-color:#444857; display:table-cell; text-align: center; color: #fff; font-size: 18px; font-weight: bold; vertical-align:middle;
              .btn_type_02{margin-top:20px;}
            }
            .box_contents{display:table-cell; padding:14px; padding-right:0px;
              .box_inner{width:100%; display:table; border-top:1px solid #ccc;
                &.last_inner{border-bottom:1px solid #ccc;}
                .box_inner_text_title{display:table-cell; width:200px; height:246px; background-color:#444857; text-align: center; color: #fff; font-size: 18px; font-weight: bold; vertical-align:middle;}
                .box_inner_text_contents{display:table-cell; padding:14px; vertical-align:middle;
                  textarea{width: 100%; height: 127px; border: 1px solid #ccc; padding: 10px;}
                  .label_prologue{color:#888; padding-top:10px;}
                }
                .box_inner_input_title{display:table-cell; width:200px; height:71px; background-color:#444857; text-align: center; color: #fff; font-size: 18px; font-weight: bold; vertical-align:middle;}
                .box_inner_input_contents{display:table-cell; padding:14px; vertical-align:middle;
                  input{width:100%; border:1px solid #ccc; height:44px; line-height:44px;}
                }
              }
            }
          }
        }
      }
    }
  }
</style>

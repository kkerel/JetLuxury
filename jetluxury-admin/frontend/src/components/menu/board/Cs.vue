<template>
  <div class="contents_wrap">
    <transition name='modal'>
      <!--
        Component paths below ↓↓↓↓  from 'components/popup/CsAnswerPopup'
      -->
      <CsAnswerPopup :popup="popup" v-if="popupAnswer" @close="popupAnswer = false"></CsAnswerPopup>
    </transition>
    <transition name='modal'>
      <!--
        Component paths below ↓↓↓↓  from 'components/popup/Popup'
      -->
      <Popup :popup="popup" v-if="popupStatus" @close="popupStatus = false"></Popup>
    </transition>
    <div class="title_wrap">
      <!--
        Component paths below ↓↓↓↓  from 'components/ui/PageTitle'
      -->
      <PageTitle :page="page"/>
    </div>
    <section class="contents">
      <div class="search_wrap">
        <!-- subTitle search -->
        <div class="title_wrap">
          <div class="btn_type_01">검색하기</div>
          <!--
            Component paths below ↓↓↓↓  from 'components/ui/PageSubTitle'
          -->
          <PageSubTitle :SubTitle="SubTitle"/>
        </div>
        <!-- // subTitle search -->
        <!-- input , select -->
        <div class="search_contents box_type_01">
          <!-- 검색어 -->
          <div class="box_inner_wrap">
            <div class="box">
              <div class="box_title">답변상태</div>
              <div class="box_contents">
                <div><input type="text" class="input_type_s" placeholder="회원이메일"></div>
              </div>
            </div>
            <div class="box">
              <div class="box_title">문의유형</div>
              <div class="box_contents">
                <SearchSelect class="select"/>
              </div>
            </div>
          </div>
          <!-- 검색어 -->
          <!-- 기간선택 -->
          <div class="box_inner_wrap">
            <div class="box_title">검색</div>
            <div class="box_contents">
              <div><input type="text" class="input_type_s" placeholder="회원이메일"></div>
              <div class="term_choice_wrap">
                <ul>
                  <li>
                    <input type="radio" name="day" id="today" checked>
                    <label for="today">오늘</label>
                  </li>
                  <li>
                    <input type="radio" name="day" id="one week">
                    <label for="one week">7일</label>
                  </li>
                  <li>
                    <input type="radio" name="day" id="one month">
                    <label for="one month">1개월</label>
                  </li>
                  <li>
                    <input type="radio" name="day" id="three month">
                    <label for="three month">3개월</label>
                  </li>
                  <li>
                    <input type="radio" name="day" id="one year">
                    <label for="one year">1년</label>
                  </li>
                </ul>
              </div>
            </div>
          </div>
          <!-- 기간선택 -->
          <!-- 검색 -->
          <div class="box_inner_wrap">
            <div class="box_title">검색</div>
            <div class="box_contents">
              <!--
                Component paths below ↓↓↓↓  from 'components/ui/SearchSelect'
              -->
              <SearchSelect class="select"/>
              <div><input type="text" class="input_type_s"></div>
            </div>
          </div>
          <!-- 검색 -->
        </div>
        <!-- // input , select -->
        <!-- search board -->
        <div class="board__result">
          <div class="board__result--value">
            <!--
              Component paths below ↓↓↓↓  from 'components/ui/SearchResult'
            -->
            <SearchResult/>
          </div>
          <table>
            <tr>
              <th>번호</th>
              <th>답변상태</th>
              <th>상품명</th>
              <th>질문제목</th>
              <th>질문내용</th>
              <th>질문등록회원</th>
              <th>질문등록일</th>
              <th>공개여부</th>
              <th>답변/삭제</th>
            </tr>
            <tr>
              <td>7</td>
              <td>답변대기</td>
              <td>상품명</td>
              <td>질문제목</td>
              <td>질문내용</td>
              <td>admin_text@gmail.com</td>
              <td>2018-10-10 15:30</td>
              <td>공개</td>
              <td>
                <button type="button" class="btn_type_04" @click="popupAnswer = true">답변</button>
                <button type="button" class="btn_type_03" @click="popupStatus = true">삭제</button>
              </td>
            </tr>
            <tr>
              <td>7</td>
              <td>답변대기</td>
              <td>상품명</td>
              <td>질문제목</td>
              <td>질문내용</td>
              <td>admin_text@gmail.com</td>
              <td>2018-10-10 15:30</td>
              <td>비공개</td>
              <td>
                <button type="button" class="btn_type_04">수정</button>
                <button type="button" class="btn_type_03">삭제</button>
              </td>
            </tr>
          </table>
          <!--
            Component paths below ↓↓↓↓  from 'components/ui/paging'
          -->
          <paging/>
        </div>
        <!-- //search board -->
      </div>
    </section>
  </div>
</template>

<script>
  import PageTitle from 'components/ui/PageTitle'
  import PageSubTitle from 'components/ui/PageSubTitle'
  import SearchSelect from 'components/ui/SearchSelect'
  import Paging from 'components/ui/Paging'
  import SearchResult from 'components/ui/SearchResult'
  import Popup from 'components/popup/Popup'
  import CsAnswerPopup from 'components/popup/CsAnswerPopup'
  export default {
    name: 'MemberList',
    components: {
      PageTitle,
      PageSubTitle,
      SearchSelect,
      Paging,
      SearchResult,
      Popup,
      CsAnswerPopup
    },
    data () {
      return {
        popupStatus: false,
        popupAnswer: false,
        page: {
          title: '게시판',
          subTitle: '1:1문의'
        },
        SubTitle: {
          title: '1:1문의 리스트'
        },
        popup: {
          prologue1: '글 삭제시 복구 하실수 없습니다.',
          prologue2: '선택한 글을 삭제 하시겠습니까?'
        }
      }
    }
  }
</script>

<style lang="scss" scoped>
  .contents_wrap {
    .contents {
      .search_wrap{width:100%; display:table;
        .title_wrap{width:100%; display:table;
          h3{float:left; padding:8.5px 0px;}
          .btn_type_01{float:right;}
        }
        /* 기간 선택 */
        .term_choice_wrap{
          ul{letter-spacing:-5px;
            li{display:inline-block; vertical-align:middle; letter-spacing:0px; text-align:center;
              input{display:none;}
              input[type="radio"]:checked + label {background:#444857; color:#fff;}
              label{width:70px; height:44px; line-height:44px; display:inline-block; vertical-align:middle; border:1px solid #ccc; margin-left:-1px; cursor:pointer; box-sizing:border-box;}
            }
          }
        }
      }
    }
    .search_contents{
      .box_inner_wrap{width:100%; display:table;}
      .box{position:relative; float:left; width:50%;}
    }
    .login_icon_wrap{
      ul{
        li{height:26px; display:inline-block; vertical-align:middle;
          img{width:26px;}
        }
      }
    }
  }
  .title_wrap{position:relative;
    .btn_type_02{position:absolute; top:0px; right:0px; z-index:10; color:#fff;}
  }
</style>

<template>
  <div class="contents_wrap">
    <transition name='modal'>
      <!--
        Component paths below ↓↓↓↓  from 'components/popup/Popup'
      -->
      <Popup :popup="popup" v-if="popupStatus" @close="popupStatus = false"></Popup>
      <!--
        Component paths below ↓↓↓↓  from 'components/popup/Popup'
      -->
      <Popup :popup="popupSec" v-if="popupSecession" @close="popupSecession = false"></Popup>
      <!--
        Component paths below ↓↓↓↓  from 'components/popup/PolicyPopup'
      -->
      <PolicyPopup v-if="PolicyPopup" @close="PolicyPopup = false"></PolicyPopup>
    </transition>
    <!--
      Component paths below ↓↓↓↓  from 'components/ui/PageTitle'
    -->
    <PageTitle :page="page"/>
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
            <div class="box_title">검색어</div>
            <div class="box_contents">
              <div><input type="text" class="input_type_s" placeholder="회원이메일"></div>
            </div>
          </div>
          <!-- 검색어 -->
          <!-- 기간선택 -->
          <div class="box_inner_wrap">
            <div class="box_title">기간선택</div>
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
        </div>
        <!-- // input , select -->
        <!-- search board -->
        <div class="result_board_wrap">
          <div class="result_wrap">
            <!--
               Component paths below ↓↓↓↓  from 'components/ui/SearchResult'
             -->
            <SearchResult/>
            <div class="btn_type_02" @click="PolicyPopup = true">정책보기</div>
          </div>
          <table class="table_type_03">
            <!-- 추후 삭제 예정 kevin -->
            <!--<colgroup>-->
              <!--<col width="64px">-->
              <!--<col width="64px">-->
              <!--<col width="180px">-->
              <!--<col width="356px">-->
              <!--<col width="142px">-->
              <!--<col width="113px">-->
              <!--<col width="163px">-->
              <!--<col width="162px">-->
              <!--<col width="144px">-->
              <!--<col width="144px">-->
            <!--</colgroup>-->
            <!-- 추후 삭제 예정 kevin -->
            <tr>
              <th><input type="checkbox"></th>
              <th>번호</th>
              <th>휴면전환 전환일</th>
              <th>주문자</th>
              <th>기존 회원등급</th>
              <th>포인트</th>
              <th>회원가입일</th>
              <th>최종접속일</th>
              <th>휴면해제</th>
              <th>탈퇴처리</th>
            </tr>
            <tr>
              <td><input type="checkbox"></td>
              <td>1</td>
              <td>2018-10-10 13:10</td>
              <td>
                <p>주문자</p>
                <p>(비회원)</p>
              </td>
              <td>PRime</td>
              <td>128,000</td>
              <td>2018-10-10 13:10</td>
              <td>2018-10-10 13:10</td>
              <td><button type="button" class="btn_type_03" @click="popupSecession = true">해제</button></td>
              <td><button type="button" class="btn_type_03" @click="popupStatus = true">탈퇴</button></td>
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
  import PolicyPopup from 'components/popup/PolicyPopup'
  export default {
    name: 'DeliveryCompleted',
    components: {
      PageTitle,
      PageSubTitle,
      SearchSelect,
      Paging,
      SearchResult,
      Popup,
      PolicyPopup
    },
    data () {
      return {
        popupStatus: false,
        popupSecession: false,
        PolicyPopup: false,
        page: {
          title: '회원',
          subTitle: '휴면회원 관리'
        },
        SubTitle: {
          title: '결제완료 리스트'
        },
        popup: {
          prologue1: '회원정보는 삭제하면 복구 하실 수 없습니다.',
          prologue2: '선택한 회원정보을 삭제 하시겠습니까?'
        },
        popupSec: {
          prologue1: '해당 회원의 휴면상태를 해제 하시겠습니까?'
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
        .result_board_wrap{
          .result_wrap{position:relative;
            .btn_type_02{position:absolute; top:0px; right:0px;}
          }
        }
      }
    }
  }
</style>

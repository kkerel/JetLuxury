<template>
  <div class="contents_wrap">

    <transition name='modal'>
      <!--
        Component paths below ↓↓↓↓  from 'components/popup/Popup'
      -->
      <Popup :popup="popup" v-if="popupStatus" @close="confirmDisable"></Popup>
    </transition>
    <transition name='modal'>
      <!--
        Component paths below ↓↓↓↓  from 'components/popup/FaqPopup'
      -->
      <FaqPopup v-if="FaqPopupStatus" @close="FaqPopupStatus = false" ></FaqPopup>
    </transition>


    <div class="title_wrap">
      <!--
        Component paths below ↓↓↓↓  from 'components/ui/PageTitle'
      -->
      <PageTitle :page="page"/>
      <div class="btn_type_02" @click="FaqPopupStatus = true">등록하기</div>
    </div>
    <section class="contents">
      <div class="search_wrap">
        <!-- subTitle search -->
        <div class="title_wrap">
          <div class="btn_type_01" @click="search()">검색하기</div>
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
              <div class="box_title">대분류</div>
              <div class="box_contents">
                <div><input type="text" class="input_type_s" placeholder="회원이메일"></div>
              </div>
            </div>
            <div class="box">
              <div class="box_title">중분류</div>
              <div class="box_contents">
<!--
                Component paths below ↓↓↓↓  from 'components/ui/SearchSelect'
-->
                <SearchSelect class="select" :items="searchOptions" :initValue="searchOption" @change="changeSearchOption"/>
              </div>
            </div>
          </div>
          <!-- 검색어 -->
          <!-- 기간선택 -->
          <div class="box_inner_wrap">
            <div class="box_title">기간선택</div>
            <div class="box_contents">
              <div>등록일</div>
              <div><DatePicker v-model="startDateInput" :format="customFormatter" :clear-button="true"></DatePicker></div>
              <div> - </div>
              <div><DatePicker v-model="endDateInput" :format="customFormatter" :clear-button="true"></DatePicker></div>
              <div class="term_choice_wrap">
                <ul>
                  <li>
                    <input type="radio" name="day" id="today" @change="changeDate(0)">
                    <label for="today">오늘</label>
                  </li>
                  <li>
                    <input type="radio" name="day" id="one week" @change="changeDate(1)">
                    <label for="one week">7일</label>
                  </li>
                  <li>
                    <input type="radio" name="day" id="one month" @change="changeDate(2)">
                    <label for="one month">1개월</label>
                  </li>
                  <li>
                    <input type="radio" name="day" id="three month" @change="changeDate(3)">
                    <label for="three month">3개월</label>
                  </li>
                  <li>
                    <input type="radio" name="day" id="one year" @change="changeDate(4)">
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
              <SearchSelect class="select" :items="searchOptions" :initValue="searchOption" @change="changeSearchOption"/>
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
              <th>대분류</th>
              <th>중분류</th>
              <th>질문내용</th>
              <th>등록자</th>
              <th>등록일</th>
              <th>수정/삭제</th>
            </tr>
           <!-- <tr>
              <td>번호</td>
              <td>대분류</td>
              <td>이미지</td>
              <td>상품명</td>
              <td>판매가</td>
              <td>
                <p>2018-11-05</p>
              </td>
              <td>
                <button type="button" class="btn_type_04">수정</button>
                <button type="button" class="btn_type_03">삭제</button>
              </td>
            </tr>-->
            <tr v-for="(faq,index) in searchOptions">
              <td>상품명</td>
              <td>판매가</td>
              <td>브랜드</td>
              <td>등록일</td>
              <td>노출</td>
              <td>판매가능</td>
              <td>
                <button v-if="clicked[index]" @click="saveChanges(faq)" type="button" class="btn_type_05">
                  수정완료</button>
                <p v-else>
                  <button @click="edit(index)" type="button"class="btn_type_04">수정</button>
                  <button type="button" class="btn_type_03" @click="disableFaq(faq)">삭제</button>
                </p>
              </td>
            </tr>
          </table>
          <!--
            Component paths below ↓↓↓↓  from 'components/ui/Paging'
          -->
          <Paging/>
        </div>
        <!-- //search board -->
      </div>
    </section>
  </div>
</template>

<script>
  /*eslint-disable*/
import PageTitle from 'components/ui/PageTitle'
import PageSubTitle from 'components/ui/PageSubTitle'
import SearchSelect from 'components/ui/SearchSelect'
import Paging from 'components/ui/Paging'
import Popup from 'components/popup/Popup'
import SearchResult from 'components/ui/SearchResult'
import FaqPopup from 'components/popup/FaqPopup'
import DatePicker from 'vuejs-datepicker'
import moment from 'moment'
const SEARCH_OPTIONS = [
    {name: '브랜드명', value: 'brand_name'},
    {name: '브랜드국가', value: 'brand_coname'}
]

export default {
  name: 'FaqList',
  components: {
    PageTitle,
    PageSubTitle,
    SearchSelect,
    Paging,
    Popup,
    SearchResult,
    FaqPopup,
    DatePicker
  },
  data () {
    return {
      FaqPopupStatus: false,
      popupStatus: false,
      page: {
        title: '게시판',
        subTitle: 'FAQ 리스트'
      },
      SubTitle: {
        title: 'FAQ 리스트'
      },
      popup: {
        prologue1: '글 삭제시 복구 하실 수 없습니다.',
        prologue2: '선택한 글을 삭제 하시겠습니까?'
      },
      clicked: [],
      searchOptions: SEARCH_OPTIONS, // values for the select box
      searchOption: SEARCH_OPTIONS[0].value, // default value for the select box
      searchInput: '',
      startDateInput: '',
      endDateInput: ''
    }
  },
  methods: {
       // date term handler click
    changeDate (date) {
      this.endDateInput = moment().format('YYYY/MM/DD')
      if (date === 0) {
        this.startDateInput = this.endDateInput
      } else if (date === 1) {
        this.startDateInput = moment().add(-7, 'day').format('YYYY/MM/DD')
      } else if (date === 2) {
        this.startDateInput = moment().add(-1, 'month').format('YYYY/MM/DD')
      } else if (date === 3) {
        this.startDateInput = moment().add(-3, 'month').format('YYYY/MM/DD')
      } else if (date === 4) {
        this.startDateInput = moment().add(-1, 'year').format('YYYY/MM/DD')
      }
    },
    // custom formatter
    customFormatter (date) {
      return moment(date).format('YYYY/MM/DD')
    },
    // edit for toggler
    edit (item) {
        // change the row to form
      this.$set(this.clicked, item, true)
    },
   // Save Changes
    saveChanges(faq){
        // call save api and restore the form to normal row
        this.clicked = [];
   },
    // disable FAQ will show you confirmation popup
   disableFaq(id){
        // show the popup
        this.popupStatus = true;
    },
   // confrim deletion(disable)
   confirmDisable(confrimation){
        this.popupStatus = false;
        if(confrimation ==1){
            alert("Deleted");
        } else {
            alert("Delete cancelled")
        }
    },
   // search button click handler
   search(){
   // get all data and call api for search
    alert('arrived');
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
      .box_inner_wrap{width:100%; display:table;
        .box{position:relative; float:left; width:50%;}
      }
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

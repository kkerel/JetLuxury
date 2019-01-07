<template>
  <div class="contents_wrap">
    <transition name='modal'>
      <Popup :popup="popup" v-if="popupStatus" @close="close()"></Popup>
    </transition>
    <!--
      Component paths below ↓↓↓↓  from 'components/ui/PageTitle'
    -->
    <PageTitle :page="page"/>
    <section class="contents">
      <div class="search_wrap">
        <!-- subTitle search -->
        <div class="title_wrap">
          <div class="btn_type_01" @click="searchMember">검색하기</div>
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
              <div class="box_title">검색어</div>
              <div class="box_contents">
                <div><input type="text" class="input_type_s" placeholder="회원이메일" v-model="keyword"></div>
              </div>
            </div>
            <!--<div class="box">-->
              <!--<div class="box_title">회원등급</div>-->
              <!--<div class="box_contents">-->
                <!--&lt;!&ndash;-->
                  <!--Component paths below ↓↓↓↓  from 'components/ui/SearchSelect'-->
                <!--&ndash;&gt;-->
                <!--<SearchSelect class="select"/>-->
              <!--</div>-->
            <!--</div>-->
          </div>
          <!-- 검색어 -->
          <!-- 기간선택 -->
          <div class="box_inner_wrap">
            <div class="box_title">기간선택</div>
            <div class="box_contents">
              <div><input v-model="date_range" type="text" class="input_type_s" placeholder="YYYY/MM/DD - YYYY/MM/DD"></div>
              <div class="term_choice_wrap">
                <ul>
                  <li>
                    <input type="radio" name="day" id="today" checked>
                    <label for="today" @click="setDateTerm(1)">오늘</label>
                  </li>
                  <li>
                    <input type="radio" name="day" id="one week" value="2">
                    <label for="one week" @click="setDateTerm(2)">7일</label>
                  </li>
                  <li>
                    <input type="radio" name="day" id="one month" value="3">
                    <label for="one month" @click="setDateTerm(3)">1개월</label>
                  </li>
                  <li>
                    <input type="radio" name="day" id="three month" value="4">
                    <label for="three month" @click="setDateTerm(4)">3개월</label>
                  </li>
                  <li>
                    <input  type="radio" name="day" id="one year" value="5">
                    <label for="one year" @click="setDateTerm(5)">1년</label>
                  </li>
                </ul>
              </div>
            </div>
          </div>
          <!-- 기간선택 -->
        </div>
        <!-- // input , select -->
        <!-- search board -->
        <div class="board__result">
          <div class="board__result--value">
            <div style="color:red;">{{error}}{{success}}</div>
            <!--
              Component paths below ↓↓↓↓  from 'components/ui/SearchResult'
            -->
            <SearchResult/>
          </div>
          <table>
            <tr>
              <th>회원아이디</th>
              <th>계정연결</th>
              <th>회원등급</th>
              <th>포인트</th>
              <th>구매건수</th>
              <th>구매금액</th>
              <th>회원가입일</th>
              <th>최종접속일</th>
              <th>수정/삭제 end</th>
            </tr>
            <tr v-for="(item, index) in getMember">
              <td>{{item.memb_id}}</td>
              <td>
                <div class="login_icon_wrap">
                  <ul>
                    <li v-if="item.memb_naver=='y'"><img src="../../../assets/images/icon/admin_n_on.svg" alt="네이버"></li>
                    <li v-if="item.memb_kakao=='y'"><img src="../../../assets/images/icon/admin_k_on.svg" alt="네이버"></li>
                    <li v-if="item.memb_google=='y'"><img src="../../../assets/images/icon/admin_g_on.svg" alt="네이버"></li>
                    <li v-if="item.memb_fbook=='y'"><img src="../../../assets/images/icon/admin_f_on.svg" alt="네이버"></li>
                  </ul>
                </div>
              </td>
              <td>
                <p v-if="clicked[index]"> <select v-model="selected" @change="">
                  <option disabled value="Please select one">Please select one</option>
                  <option value="1">member
                  </option>
                  <option value="2">Best
                  </option>
                  <option value="3">Prime</option>
                  <option value="4">VIP</option>
                  <option value="5">VVIP</option>
                </select>
                </p>
                <p v-else>
                  <span v-if="item.memb_status==0">disabled</span>
                  <span v-if="item.memb_status==1">member</span>
                  <span v-if="item.memb_status==2">Best</span>
                  <span v-if="item.memb_status==3">Prime</span>
                  <span v-if="item.memb_status==4">VIP</span>
                  <span v-if="item.memb_status==5">VVIP</span>
                </p>
              </td>
              <td><span v-for="point in getPoint" v-if="item.memb_id==point.memb_id">{{point.point}}</span></td>
              <td><span v-for="count in getOrderCount" v-if="count.memb_id==item.memb_id">{{count.count}}</span></td>
              <td><span v-for="sum in getOrderSum" v-if="sum.memb_id==item.memb_id">{{sum.sum}} </span></td>
              <td>회원가입일</td>
              <td>{{formatDate(item.memb_last_login)}}</td>
              <td>
                <button type="button" @click="edit(item.memb_id)"  class="btn_type_04" v-if="clicked[index]">수정</button>
                <p v-else>
                  <button type="button" class="btn_type_04" @click="click(index)">수정</button>
                  <button type="button" class="btn_type_03" @click="removeMember(item.memb_id)">삭제</button>
                </p>
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
  /*eslint-disable*/
  import PageTitle from 'components/ui/PageTitle'
  import PageSubTitle from 'components/ui/PageSubTitle'
  import SearchSelect from 'components/ui/SearchSelect'
  import Paging from 'components/ui/Paging'
  import SearchResult from 'components/ui/SearchResult'
  import Popup from 'components/popup/Popup'
  import moment from 'moment'
  export default {
    name: 'MemberList',
    components: {
      PageTitle,
      PageSubTitle,
      SearchSelect,
      Paging,
      SearchResult,
      Popup
    },
    data () {
      return {
        page: {
          title: '주문/배송',
          subTitle: '회원탈퇴/삭제'
        },
        SubTitle: {
          title: '회원탈퇴/삭제'
        },
        date_term: null,
        date_range: null,
        memb_status: null,
        memb_id: null,
        keyword: null,
        error: null,
        selected: null,
        clicked: [],
        popupStatus: false,
        popup: {
          prologue1: '글 삭제시 복구 하실수 없습니다.',
          prologue2: '선택한 글을 삭제 하시겠습니까?'
        }
      }
    },
    created() {
      this.error= this.$store.state.error
    },
    computed: {
      success () {
        return this.$store.state.success
      },
      getMember () {
        if (!this.$store.state.memberList) {
          this.$store.dispatch('getMember', {date_term: null, keyword: null, memb_status: null, date_range: null})
        }
        return this.$store.state.memberList
      },
      getPoint(){
        if(!this.$store.state.pointList)
        {
          this.$store.dispatch('getPoint')
        }
        return this.$store.state.pointList
      },
      getOrderSum(){
        if(!this.$store.state.orderSum)
        {
          this.$store.dispatch('getOrderSum')
        }
        return this.$store.state.orderSum
      } ,
      getOrderCount(){
        if(!this.$store.state.orderCount)
        {
          this.$store.dispatch('getOrderCount')
        }
        return this.$store.state.orderCount
      }
    },
    methods: {
      formatDate:function(date){
        return moment(date).format('YYYY-MM-DD');
      },
      edit(memb_id) {
        this.$store.dispatch('editMember',{ memb_id: memb_id, memb_status: this.selected})
      },
      click (item) {
        this.$set(this.clicked, item, true)
      },
      close(){
        this.popupStatus = false
        if( this.$store.state.confirmPopup == 1 )
        {
          this.$store.dispatch('removeMember', { memb_id: this.memb_id })
        }
      },
      removeMember(memb_id){
        this.popupStatus =true;
        this.memb_id=memb_id
      },
      setDateTerm(value)
      {
        this.date_term=value
      },
      searchMember () {
        if (this.date_range) {
          var date_range = this.date_range.split('-');

          var from = Date.parse(date_range[0]);
          var to = Date.parse(date_range[1]);

          if (isNaN(from)) {
            this.error = "Invalid Date"
            return
          } else if (isNaN(to) == true) {
            this.error = "Invalid Date"
            return
          }
        }
          var memb_level = this.$store.state.memb_level ? this.$store.state.memb_level : null;// accepts the column name
          this.$store.dispatch('getMember', {
            date_term: this.date_term,
            keyword: this.keyword,
            memb_status: memb_level,
            date_range: this.date_range
          })
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
        .term_choice_wrap{width:353px;
          ul{letter-spacing:-6px;
            li{width:69px; display:inline-block; vertical-align:middle; letter-spacing:0px; text-align:center;
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
</style>

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
              <div><DatePicker v-model="startDate" :format="formatDate" :clear-button="true"></DatePicker></div>
              <div> - </div>
              <div><DatePicker v-model="endDate" :format="formatDate" :clear-button="true"></DatePicker></div>
<!--
              <div><input v-model="date_range" type="text" class="input_type_s" placeholder="YYYY/MM/DD - YYYY/MM/DD"></div>
-->
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
        </div>
        <!-- // input , select -->
        <!-- search board -->
        <div class="board__result">
          <div class="board__result--value">
            <!--
              Component paths below ↓↓↓↓  from 'components/ui/SearchResult'
            -->
             <SearchResult :searchCount="searchCount" :totalCount="totalCount"/>
          </div>
          <table>
            <tr>
              <th>번호</th>
              <th>회원아이디</th>
              <th>계정연결</th>
              <!--<th>회원등급</th>-->
              <th>개인통관번호</th>
              <th>구매건수</th>
              <th>구매금액</th>
              <th>회원가입일</th>
              <th>최종접속일</th>
              <th>수정/삭제</th>
            </tr>
            <tr v-for="(item, index) in this.$store.state.data">
                <!--<td>{{computeNumbering(index)}}</td>-->
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
              <td><p v-if="item.memb_code"> {{item.memb_code}} </p>
                <p v-else>no value </p></td>
              <td><span v-for="count in getOrderCount" v-if="count.memb_id==item.memb_id">{{count.count}}</span></td>
              <td><span v-for="sum in getOrderSum" v-if="sum.memb_id==item.memb_id">{{sum.sum}} </span></td>
              <td>{{formatDate(item.memb_created,1)}}</td>
              <td>{{formatDate(item.memb_last_login,1)}}</td>
              <td></td>
              <td>
                <!--<button type="button" @click="edit(item.memb_id)"  class="btn_type_04" v-if="clicked[index]">수정</button>-->
                <p>
                <!--<button type="button" class="btn_type_04" @click="click(index)">수정</button>-->
                <button type="button" class="btn_type_03" @click="removeMember(item.memb_id)">삭제</button>
                </p>
              </td>
            </tr>
          </table>
          <!--
            Component paths below ↓↓↓↓  from 'components/ui/paging'
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
  import SearchResult from 'components/ui/SearchResult'
  import Popup from 'components/popup/Popup'
  import DatePicker from 'vuejs-datepicker'
  import moment from 'moment'
  const URL  = '/back';
  export default {
    name: 'MemberList',
    components: {
      PageTitle,
      PageSubTitle,
      SearchSelect,
      Paging,
      SearchResult,
      Popup,
      DatePicker
    },
    data () {
      return {
        page: {
          title: '주문/배송',
          subTitle: '회원 리스트'
        },
        SubTitle: {
          title: '회원 리스트'
        },
        startDate:'',
        endDate:'',
        memb_status: '',
        memb_id: null,
        memberList:[],
        keyword: null,
        error: null,
        selected: null,
        clicked: [],
        popupStatus: false,
        totalCount: 0,
        searchCount: 0,
        page_num:0, // number of paginations
        pagination:0,  // for pagination
        loop:1,  // for requesting one time only
        popup: {
          prologue1: '글 삭제시 복구 하실수 없습니다.',
          prologue2: '선택한 글을 삭제 하시겠습니까?'
        }
      }
    },
    created() {
        this.error= this.$store.state.error;
        if(this.loop==1) {
            this.makeRequest();
            this.loop +=1;
        }
    },
    computed: {
      success () {
        return this.$store.state.success
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
      formatDate:function(date,type){
          if(type==1) {
              return moment(date).format('YYYY-MM-DD');
          }else{
              return moment(date).format('YYYY/MM/DD');
          }
      },
      makeRequest:function(){
         this.$http.get(`${URL}/member/list`,{
                 params: {
                     // start date and end date
                     endDate: this.endDate,
                     startDate: this.startDate,
                     keyword: this.keyword,
                     memb_status: this.memb_status
                 }
            })
           .then(result=> {
             if (result.status == 200) {
               this.memberList=result.data.member.member;

               this.searchCount = result.data.available;
               this.totalCount = result.data.member.total_rows;
                 //format pagination after result is done.
                 if(this.memberList.length > 1){
                     this.pagination = Math.ceil(this.memberList.length/this.$store.state.perPage);
                 }
                 // update pagination state
                 this.$store.dispatch("updatePagination",{
                     pagination_no:this.pagination
                 });
                 // paginate
                 this.$store.dispatch('paginate',{
                     start:0,
                     end:this.$store.state.perPage,
                     data:this.memberList,
                     active:1,
                 });
             }
           });
     },
      // for numbering in the table
      computeNumbering:function(index){
            return this.$store.state.active + index +1;
      },

     // set the pagination
      edit(memb_id) {
        this.$store.dispatch('editMember',{ memb_id: memb_id, memb_status: this.selected})
      },
      click (item) {
        this.$set(this.clicked, item, true)
      },
      close(){
        this.popupStatus = false;
        if( this.$store.state.confirmPopup === 1 )
        {
          this.$store.dispatch('removeMember', { memb_id: this.memb_id });
            this.$http.put(`${URL}/member/remove`,{
                memb_id: this.memb_id
            }).then(result=>{
                if(result.status==200) {
                    this.$store.state.success = result.data.msg;
                    this.makeRequest();
                } else {
                    this.$store.state.error = result.data.msg;
                }
            }).catch(err => {
                this.$store.state.error = err.message;
            })
        }
      },
      removeMember(memb_id){
        this.popupStatus =true;
        this.memb_id=memb_id
      },
      changeDate (date) {
            this.endDate = moment().format('YYYY/MM/DD')
            if (date === 0) {
                this.startDate = this.endDate
            } else if (date === 1) {
                this.startDate = moment().add(-7, 'day').format('YYYY/MM/DD')
            } else if (date === 2) {
                this.startDate = moment().add(-1, 'month').format('YYYY/MM/DD')
            } else if (date === 3) {
                this.startDate = moment().add(-3, 'month').format('YYYY/MM/DD')
            } else if (date === 4) {
                this.startDate = moment().add(-1, 'year').format('YYYY/MM/DD')
            }

        },
      searchMember () {
        //this.setPationation();
        if (this.startDate&&this.endDate) {
            this.date_range = this.formatDate(this.startDate)+"-"+this.formatDate(this.endDate);
        }
        // update the current values and make request
          var memb_level = this.$store.state.memb_level ? this.$store.state.memb_level : null;// accepts the column name
          this.memb_status = memb_level;
          this.makeRequest();
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

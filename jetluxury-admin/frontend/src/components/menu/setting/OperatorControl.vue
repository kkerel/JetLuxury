<template>
  <div class="page__contents__wrapper">
    <transition name='modal'>
      <Popup :popup="popup" v-if="popupStatus" @close="close()"></Popup>
      <MemberPopup v-if="makeModal" :scrollPop="popupScroll" @close="popupClose(); makeModal = false"
      :admin_id="admin_id"></MemberPopup>
    </transition>
    <PageTitle :page="page"/>
    <section class="page__contents">
      <div class="page__contents__list__wrap">
        <div class="list--situation">
          <span class="list--situation--success">{{success}}</span>
        </div>
        <!-- subTitle search -->
        <div class="page__contents__title__wrap">
          <div class="page__contents__btn btn-type-01" @click="findAdmin">검색하기</div>
          <!--
            Component paths below ↓↓↓↓ import PageSubTitle from 'components/ui/PageSubTitle'
          -->
          <PageSubTitle :SubTitle="SubTitle"/>
        </div>
        <!-- // subTitle search -->
        <!-- input , select -->
        <div class="search_contents box_type_01">
          <div class="box_inner_wrap">
            <div class="box_title">검색어</div>
            <div class="box_contents">
              <SearchSelect class="select" :items="items2" :initValue="searchOption" @change="changeSearchColumn"/>
                <div><input type="text" class="input_type_s" v-model="keyword"></div>
              <!--<div class="atsign">@</div>-->
              <!--
                Component paths below ↓↓↓↓ import SearchSelect from 'components/ui/SearchSelect'
              -->
            </div>
          </div>
        </div>
        <!-- // input , select -->
        <!-- search board -->
        <div class="board__result">
          <div class="board__result--value">
            <SearchResult :searchCount="searchCount" :totalCount="totalCount"/>
            <div class="btn_type_01" @click="create">운영자추가</div>
          </div>
          <table>
            <tr>
              <th>번호</th>
              <th>아이디(이메일)</th>
              <th>이름</th>
              <th>패스워드</th>
              <th>직원여부</th>
              <th>연락처</th>
              <th>등록일</th>
              <th>권한</th>
              <th>수정삭제</th>
            </tr>
            <tr v-for="(item,index) in slicedData">
              <td>{{computeNumbering(index)}}</td>
              <td>{{item.admin_id}}</td>
              <td>
                <p>{{item.admin_name}}</p>
              </td>
              <td>
                <input type="password" value="item.admin_pw" readonly></td>
              <td>
                <p v-if="clicked[index]"> <select v-model="selected" @change="">
                  <option value="1">직원
                  </option>
                  <option value="2">아르바이트
                  </option>
                  <option value="3">비정규직</option>
                </select>
                </p>
                <p v-else><span v-if="item.admin_status==1">직원</span>
                  <span v-else-if="item.admin_status==2">아르바이트</span>
                  <span v-else>비정규직</span>
                </p>
              </td>
              <td>
                <p v-if="clicked[index]"><input type="text" v-model="contact" class="input_type_01"/></p>
                <p v-else>{{item.admin_contact}} </p>
              </td>
              <td> {{formatDate(item.admin_created)}}</td>
              <!--<td><button type="button" class="btn_type_03" @click="popupAdmin = true">권한</button></td>-->
              <td><button type="button" class="btn_type_03" @click="popupOpenBtn('makeModal',item.admin_id)">권한</button></td>
              <td>
                <button type="button" @click="edit(item.admin_id)"  class="btn_type_04" v-if="clicked[index]">수정</button>
                <p v-else>
                <button  @click="click(index,item.admin_contact,item.admin_status)" type="button" class="btn_type_04">수정</button>
                <button type="button" class="btn_type_03" @click="removeAdmin(item.admin_id)">삭제</button>
                </p>
              </td>
            </tr>
            <tr v-show="show">
              <td>{{this.$store.state.searchMatch+1}}</td>
              <td><input type="text" v-model="email" class="input_type_01"/></td>
              <td><input type="text" v-model="admin_name" class="input_type_01" required/></td>
              <td><input type="password" v-model="admin_pw" class="input_type_01" required/></td>
              <td>
                <select v-model="selected" @change="">
                  <option value="2">직원
                  </option>
                  <option value="3">아르바이트
                    </option>
                  <option value="4">비정규직</option>
                </select>
              </td>
              <td><input type="text" v-model="contact" class="input_type_01"/></td>
              <td><input type="text" v-model="createdDate" disabled></td>
              <td><button type="button" class="btn_type_03">권한</button></td>
              <td>
                <button type="button" class="btn_type_05" @click="saveAdmin">수정완료</button>
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
import BoardSelect from 'components/ui/BoardSelect'
import Paging from 'components/ui/Paging'
import SearchSelect from 'components/ui/SearchSelect'
import SearchResult from 'components/ui/SearchResult'
import Popup from 'components/popup/Popup'
import MemberPopup from 'components/popup/MemberPopup'
import moment from 'moment'
  const SEARCH_OPTIONS = [
      {name: '관리자이메일', value: 'admin_id'},
      {name: '연락처', value: 'admin_name'}
  ];
  const url  = '/back';

  export default {
  name: 'BasicSetting',
  components: {
    PageTitle,
    PageSubTitle,
    SearchSelect,
    Paging,
    SearchSelect,
    SearchResult,
    Popup,
    MemberPopup,
    BoardSelect
  },
  data () {
    return {
        //variables for create operation and edit
      admin_name: null,
      adminList:[],
      email: null,
      selected: null,
      contact: null,
      createdDate: this.formatDate(new Date()),
      toggle: true,
      admin_pw: null,
      //======================
      show: false,
      clicked: [],
      admin_id: null,
      items: [1],
      keyword: null,
      col_name:null,
      makeModal: false,
      popupStatus: false,
      page_num: 0,
      totalCount: 0,
      searchCount: 0,
      searchOption: SEARCH_OPTIONS[0].value,
      items2:SEARCH_OPTIONS,
      start: this.$store.state.active,
      page: {
        title: '기본설정',
        subTitle: '운영자관리'
      },
      SubTitle: {
        title: '운영자 리스트'
      },
      popup: {
        prologue1: '글 삭제시 복구 하실수 없습니다.',
        prologue2: '선택한 글을 삭제 하시겠습니까?'
      },
      loop:0,
    }
  },
  created(){
    if(this.loop==0){
        this.fetchList();
        this.loop++;
    }
  },
  computed: {
    error () {
      return this.$store.state.error
    },
    success () {
      return this.$store.state.success
    },
    slicedData(){
        return this.$store.state.data;
    }
  },
  methods: {
    formatDate:function(date){
      return moment(date).format('YYYY-MM-DD');
    },

    changeSearchColumn(col_name){
      this.col_name = col_name;
    },
      // fetchs data from db
    fetchList:function(){
        this.$http.get(`${url}/admin/list`, {
            params: {
                col_name: this.col_name,
                keyword: this.keyword
            }
        }).then(result=>{
            if (result.status == 200) {
              this.adminList=result.data.admin.admin;
              this.searchCount = result.data.available;
              this.totalCount = result.data.admin.total_rows;
                //format pagination after result is done.
                if(this.adminList.length <1){
                  this.pagination =0;
                }
                else{
                    this.pagination = Math.ceil(this.adminList.length/this.$store.state.perPage);
                }
                // update pagination state
                this.$store.dispatch("updatePagination",{
                    pagination_no:this.pagination,
                    total_rows:result.data.admin.total_rows,
                    available:result.data.available
                });
                // paginate
                this.$store.dispatch('paginate',{
                    start:0,
                    end:this.$store.state.perPage,
                    data:this.adminList,
                    active:this.start,
                });
                // reset variables
                this.keyword=null;
                this.col_name=null;
            }
        })
    },
    edit(admin_id) {
            this.$http.put(`${url}/admin/edit`,{
                admin_id: admin_id,
                admin_status: this.selected,
                admin_contact: this.contact
            }).then(result=>{
                if(result.status==200) {
                    this.$store.state.success = result.data.msg;
                    this.col_name=null; // reset search col
                    this.keyword=null; // reset form
                    this.clicked = []; // change edit form to table row
                    this.fetchList();
                } else {
                    this.$store.state.error = result.data.msg;
                }
            }).catch(err => {
                this.$store.state.error = err.msg;

            })
    },
    create() {
        this.selected=2;
        this.show=true;
    },
    close(){
      this.popupStatus = false;
      if( this.$store.state.confirmPopup == 1 )
        {
        this.$http.put(`${url}/admin/remove`,{
          admin_id: this.admin_id
        }).then(result=>{
          if(result.status==200) {
                this.$store.state.success = result.data.msg;
                this.col_name=null;
                this.fetchList();
          } else {
                this.$store.state.error = result.data.msg;
          }
        }).catch(err => {
          this.$store.state.error = err.message
        })
      }
    },
    removeAdmin(admin_id){
      this.popupStatus =true; // show popup
      this.admin_id=admin_id; // set admin Id
    },
    findAdmin () {
      var col_name = this.$store.state.col_name ? this.$store.state.col_name : 'admin_id' ;// accepts the column name
      this.col_name=col_name;
      this.fetchList();
    },
    saveAdmin () {
      let status=this.selected;
//      this.$store.dispatch('createAdmin', {admin_id: this.email, admin_name: this.admin_name,
//        admin_pw: this.admin_pw,admin_contact: this.contact,admin_status: status})
       let user={ admin_id: this.email,
                 admin_name: this.admin_name,
                 admin_pw: this.admin_pw,
                 admin_contact: this.contact,
                 admin_level: status
              };
      this.$http.post(`${url}/admin/create`,user).then(result=>{
          if(result.status==200) {
            this.$store.state.success = result.data;
            this.email = null;
            this.admin_name = null;
            this.admin_pw = null;
            this.contact = null;
            this.show = false  // hide create form
            this.fetchList();  // fetch data after creation
          } else {
                  this.$store.state.error = result.data
          }
        }).catch(err => {
              this.$store.state.error = err.message
        })

    },
    click (item, admin_contact,status) {
      this.selected=status;
      this.contact=admin_contact
      this.$set(this.clicked, item, true)
    },

    // for computing numbering
    computeNumbering:function(index){
          return this.$store.state.active + index +1;
    },
    popupOpenBtn (popupName,admin_id) {
      this.admin_id=admin_id
      const scrollPop = this
      const body = document.getElementsByTagName('body')
      body[0].classList.add('default')
      this[popupName] = true
      setTimeout(function () {
        scrollPop.popupScroll()
      }, 100)
    },
    popupScroll () {
      let addEl = document.getElementsByClassName('popup-widget')
      let widgetEl = document.getElementsByClassName('popup-contents')
      if (widgetEl.length !== 0) {
        let widgetHeight = widgetEl[0].offsetHeight + 60
        let windowHeight = window.innerHeight
        let scrollClass = 'popup--scroll'
        let popupTable = 'popup--table'
        if (widgetHeight > windowHeight) {
          addEl[0].classList.add(scrollClass)
          addEl[0].classList.remove(popupTable)
        } else {
          addEl[0].classList.remove(scrollClass)
          addEl[0].classList.add(popupTable)
        }
      }
    },
    popupClose () {
      const body = document.getElementsByTagName('body')
      body[0].classList.remove('default');
    }
  },
  mounted () {
    const scrollPop = this
    window.onresize = function (event) {
      scrollPop.popupScroll()
    }
    scrollPop.popupScroll()
  }
}
</script>

<style lang="scss" scoped>
.page__contents__wrapper{
  .page__contents{
    &__list__wrap{width:100%; display:table;
      .page__contents__title__wrap{width:100%; display:table;
        .page__contents__title{float:left; padding:8.5px 0px;}
        .page__contents__btn{float:right;}
      }
      .list--situation{
        &--error{color:red;}
        &--success{color:purple;}
      }
    }
    .result_board_wrap{
      .result_wrap{position:relative;
        .btn_type_01{position:absolute; top:0px; right:0px; z-index:10;}
        .search_result{padding:10px 0px;}
      }
    }
  }
}
</style>

<template>
  <div class="contents_wrap">
    <transition name='modal'>
      <!--
        Component paths below ↓↓↓↓  from 'components/popup/BrandPopup'
      -->
      <BrandPopup v-if="popupStatus" @close="popupStatus=false" :banner="banner"  @saveBanner="saveBanner"></BrandPopup>
    </transition>
    <!--
      Component paths below ↓↓↓↓  from 'components/ui/PageTitle'
    -->
    <PageTitle :page="page"/>
    <section class="contents">
      <div class="search_wrap">
        <!-- subTitle search -->
        <div class="title_wrap">
          <div class="btn_type_01" @click="search">검색하기</div>
          <!--
            Component paths below ↓↓↓↓  from 'components/ui/PageSubTitle'
          -->
          <PageSubTitle :SubTitle="SubTitle"/>
        </div>
        <!-- // subTitle search -->
        <!-- input , select -->
        <div class="search_contents box_type_01">
          <!-- 검색 -->
          <div class="box_inner_wrap">
            <div class="box_title">검색</div>
            <div class="box_contents">
              <!--
                Component paths below ↓↓↓↓  from 'components/ui/SearchSelect'
              -->
              <SearchSelect class="select" :items="searchOptions" :initValue="searchOption" @change="changeSearchOption"/>
              <div><input type="text" class="input_type_s" v-model="searchInput"></div>
              <div class="process_choice_wrap">
                <ul class="radio_style">
                  <li>
                    <input type="radio" name="process" id="all" @change="changeType(1)" checked>
                    <label for="all">전체</label>
                  </li>
                  <li>
                    <input type="radio" name="process" id="cancelRegister" @change="changeType(2)">
                    <label for="cancelRegister">배너등록</label>
                  </li>
                  <li>
                    <input type="radio" name="process" id="Cancellationprocessing" @change="changeType(3)">
                    <label for="Cancellationprocessing">배너미등록</label>
                  </li>
                </ul>
              </div>
            </div>
          </div>
          <!-- 검색 -->
          <!-- 기간검색 -->
          <div class="box_inner_wrap">
            <div class="box_title">기간검색</div>
            <div class="box_contents">
              <div>등록일</div>
              <!-- <div><input type="text" class="input_type_s" placeholder="등록일"></div>-->
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
          <!-- 기간검색 -->
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
              <th>브랜드명</th>
              <th>브랜드배너</th>
              <th>브랜드 국가</th>
              <th>등록일</th>
              <th>수정일</th>
              <th>배너등록</th>
            </tr>
            <tr v-for="(banner, index) in this.$store.state.data">
              <td>{{computeNumbering(index)}}</td>
              <td>{{banner.brand_name}}</td>
              <td class="brand_img"><img :src="path+banner.brand_img"
                                         :alt="banner.brand_name"></td>
              <td>{{banner.brand_coname_en}}</td>
              <td>{{customFormatter(banner.brand_created)}}</td>
              <td>{{customFormatter(banner.brand_updated)}}</td>
              <td>
                <button type="button" class="btn_type_04" @click="ShowPopUP(banner)">등록</button>
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
  import BoardSelect from 'components/ui/BoardSelect'
  import BrandPopup from 'components/popup/BrandPopup'
  import DatePicker from 'vuejs-datepicker'
  import moment from 'moment'
  var url = '/back'
  const SEARCH_OPTIONS = [
    {name: '브랜드명', value: 'brand_name'},
    {name: '브랜드국가', value: 'brand_coname'}
  ]
  export default {
    name: 'BrandBanner',
    components: {
      PageTitle,
      PageSubTitle,
      SearchSelect,
      Paging,
      SearchResult,
      BoardSelect,
      BrandPopup,
      DatePicker
    },
    data () {
      return {
        banners: [],
        popupStatus: false,
        page: {
          title: '배너',
          subTitle: '브랜드배너'
        },
        SubTitle: {
          title: '브랜드배너'
        },
        searchOptions: SEARCH_OPTIONS, // values for the select box
        searchOption: SEARCH_OPTIONS[0].value, // default value for the select box
        searchInput: '',
        startDateInput: '',
        endDateInput: '',
        totalCount: 0,
        searchCount: 0,
        pagination: 0,
        type: 1, // 1 = all  2= registered  3 = unregistered
        // data memebers for the brand banner
        banner:null, // banner object for the popu
        brand_name:'',
        brand_id:'',
        brand_img:'',
        path : 'http://localhost:3003/uploads/images/brand/',
          // this variable will be changed later to remote// like http://jetluxury.com/assets/uploads/.

      }
    },
    created(){
      this.fetchList();
    },

    methods: {

      // change type handler , for all , registered and unregistered
      changeType(type) {
        this.type = type
      },

      // select option handler
      changeSearchOption(searchOption) {
        this.searchOption = searchOption
      },

      // date term handler click
      changeDate(date) {
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

      // date formater function
      customFormatter(date) {
        return moment(date).format('YYYY/MM/DD')
      },

     // numbering column in the table list above
      computeNumbering:function(index){
        return this.$store.state.active + index +1;
      },

      // show popup
      ShowPopUP:function(banner){
         this.popupStatus=true;
         this.banner = banner;
       },

      // handler for search button click
      search() {
        this.fetchList()
      },

      // making api request for Data
      fetchList() {
        let query = {}
        if (this.searchOption === 'brand_name' || this.searchOption === 'brand_coname') {
          query.searchInput = this.searchInput
          query.searchOption = this.searchOption
        }
        if (this.startDateInput && this.endDateInput) {
          // date 입력 안했을 시
          query.startDate = this.startDateInput
          query.endDate = this.endDateInput
        }
        if (this.type) {
          query.type = this.type // Example 1= all , 2 = registered only , 3 = unregistered
        }
        // make the api request
        this.$http.get(`${url}/brand/admin/list`, {
         params: query
         })
         .then((result) => {
           this.banners = result.data.data.brandList;
           this.totalCount= result.data.data.count;
           this.searchCount = result.data.data.brandList.length;

             // add paginatio here
             //format pagination after result is done.
             if(this.banners.length >1){
                 this.pagination = Math.ceil(this.banners.length/this.$store.state.perPage);
             }
             // update pagination state
             this.$store.dispatch("updatePagination",{
                 pagination_no:this.pagination
             });
             // paginate
             this.$store.dispatch('paginate',{
                 start:0,
                 end:this.$store.state.perPage,
                 data:this.banners,
                 active:0,
             });


         })
      },

      // edit Banner image handler
      saveBanner() {
          this.popupStatus = false;
          // after update call the list
          this.fetchList();
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
      .event_select{
        .input_type_s{width:138px;}
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
</style>

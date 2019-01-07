<template>
  <div class="contents_wrap">
    <transition name='modal'>
      <!--
        Component paths below ↓↓↓↓  from 'components/Popup/Popup'
      -->
      <Popup :popup="popup" v-if="popupStatus" @close="popupStatus = false"></Popup>
    </transition>
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
          <!-- 검색어 -->
          <div class="box_inner_wrap">
            <div class="box_title">검색어</div>
            <div class="box_contents">
              <!--
                Component paths below ↓↓↓↓  from 'components/ui/SearchSelect'
              -->
              <SearchSelect class="select" :items="searchOptions" :initValue="searchOption" @change="changeSearchOption"/>
              <div><input type="text" class="input_type_s" v-model="searchInput"></div>
            </div>
          </div>
          <!-- 검색어 -->
          <!-- 기간선택 -->
          <div class="box_inner_wrap">
            <div class="box_title">기간선택</div>
            <div class="box_contents">
              <!--
                Component paths below ↓↓↓↓  from 'components/ui/SearchSelect'
              -->
              <SearchSelect class="select" :items="dateOptions" :initValue="dateOption" @change="changeDateOption"/>
              <div><DatePicker v-model="startDateInput" :format="customFormatter"></DatePicker></div>
              <div> - </div>
              <div><DatePicker v-model="endDateInput" :format="customFormatter"></DatePicker></div>
              <div class="term_choice_wrap">
                <ul>
                  <li>
                    <input type="radio" name="day" value="today" id="today" @change="changeDate(0)">
                    <label for="today">오늘</label>
                  </li>
                  <li>
                    <input type="radio" name="day" value="week" id="one week" @change="changeDate(1)">
                    <label for="one week">7일</label>
                  </li>
                  <li>
                    <input type="radio" name="day" value="month" id="one month" @change="changeDate(2)">
                    <label for="one month">1개월</label>
                  </li>
                  <li>
                    <input type="radio" name="day" value="3month" id="three month" @change="changeDate(3)">
                    <label for="three month">3개월</label>
                  </li>
                  <li>
                    <input type="radio" name="day" value="year" id="one year" @change="changeDate(4)">
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
            <!--
              Component paths below ↓↓↓↓  from 'components/ui/SearchSelect'
            -->
            <SearchSelect class="sorting" :items="sortingOptions" :initValue="sortingOption" @change="changeSortingOption"/>
          </div>
          <div class="scroll__table__wrap">
            <table>
              <tr>
                <th>번호</th>
                <th>상품번호</th>
                <th>이미지</th>
                <th>이름</th>
                <th>판매가(원)</th>
                <th>브랜드</th>
                <th>등록일/수정일</th>
                <th>메인노출영역</th>
                <th>수정/삭제</th>
              </tr>
              <tr v-for="(product, index) in products">
                <td>{{index+1}}</td>
                <td>{{product.prod_id}}</td>
                <td class="board_image"><img :src="product.productImgs[0].pimg_url" alt=""></td>
                <td>{{product.prod_name}}</td>
                <td>{{product.prod_sale}}</td>
                <td>{{product.brand_name}}</td>
                <td class="date">
                  <p>{{customFormatter(product.prod_created)}}</p>
                  <p>{{customFormatter(product.prod_updated)}}</p>
                </td>
                <td>
                  <p v-if="clicked[product]"><BoardSelect :items="mainOptions" @change="changeMainOption"/></p>
                  <p v-else>{{productMain[product.prod_main]}}</p>
                </td>
                <td>
                  <button type="button" v-if="clicked[product]" class="btn_type_05" @click="update(product.prod_id)">수정완료</button>
                  <div v-else>
                    <button type="button" class="btn_type_04" @click="click(product)">수정</button>
                    <!--<button v-else @click="click(product)" type="button" class="btn_type_04">수정</button>-->
                    <button type="button" class="btn_type_03" @click="popupStatus = true">삭제</button>
                  </div>
                </td>
              </tr>
            </table>
          </div>
          <!--
            Component paths below ↓↓↓↓  from 'components/ui/Ypaging'
          -->
          <Paging :currentPage="currentPage" :totalCount="searchCount" :pageSize="pageSize" @change="changePage"/>
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
  import Paging from 'components/ui/YPaging'
  import SearchResult from 'components/ui/SearchResult'
  import BoardSelect from 'components/ui/BoardSelect'
  import Popup from 'components/popup/Popup'
  import DatePicker from 'vuejs-datepicker'
  import moment from 'moment'

  var url = '/back'
  const SEARCH_OPTIONS = [
    {name: '상품명', value: 'prod_name'},
    {name: '상품번호', value: 'prod_id'}
  ]
  const DATE_OPTIONS = [
    {name: '등록일', value: 'prod_created'},
    {name: '수정일', value: 'prod_updated'}
  ]
  const SORT_OPTIONS = [
    {name: '등록일↓', value: 0},
    {name: '등록일↑', value: 1},
    {name: '상품명↓', value: 2},
    {name: '상품명↑', value: 3},
    {name: '판매가↓', value: 4},
    {name: '판매가↑', value: 5},
    {name: '브랜드명↓', value: 6},
    {name: '브랜드명↑', value: 7}
  ]
  export default {
    name: 'ProductControl',
    components: {
      PageTitle,
      PageSubTitle,
      SearchSelect,
      Paging,
      SearchResult,
      BoardSelect,
      Popup,
      DatePicker
    },
    mounted () {
      this.fetchTotalCount()
    },
    data () {
      return {
        products: [],
        clicked: [],
        popupStatus: false,
        page: {
          title: '상품',
          subTitle: '상품관리'
        },
        SubTitle: {
          title: '상품 리스트'
        },
        popup: {
          prologue1: '글 삭제시 복구 하실수 없습니다.',
          prologue2: '선택한 글을 삭제 하시겠습니까?'
        },
        searchOptions: SEARCH_OPTIONS,
        dateOptions: DATE_OPTIONS,
        mainOptions: [
          {name: '메인비노출', value: 'none'},
          {name: '메인신상품', value: '메인신상품'},
          {name: '메인브랜드', value: '메인브랜드'},
          {name: '메인베스트', value: '메인베스트'}
        ],
        sortingOptions: SORT_OPTIONS,
        searchOption: SEARCH_OPTIONS[0].value,
        dateOption: DATE_OPTIONS[0].value,
        sortingOption: SORT_OPTIONS[0].value,
        mainOption: '',
        searchInput: '',
        startDateInput: '',
        endDateInput: '',
        totalCount: 0,
        searchCount: 0,
        currentPage: 1,
        pageSize: 20,
        productMain: {
          'none': '메인비노출',
          '메인신상품': '메인신상품',
          '메인브랜드': '메인브랜드',
          '메인베스트': '메인베스트'
        }
      }
    },
    methods: {
      click (product) {
        this.$set(this.clicked, product, true)
      },
      changeSearchOption (searchOption) {
        this.searchOption = searchOption
      },
      changeDateOption (dateOption) {
        this.dateOption = dateOption
      },
      changeMainOption (mainOption) {
        this.mainOption = mainOption
      },
      changeSortingOption (sortingOption) {
        this.sortingOption = sortingOption
      },
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
      customFormatter (date) {
        return moment(date).format('YYYY/MM/DD')
      },
      search () {
        this.currentPage = 1
        this.fetchList()
      },
      fetchList () {
        let query = {}
        if (this.searchOption === 'prod_id') {
          query.prod_id = this.searchInput
        } else if (this.searchOption === 'prod_name') {
          query.prod_name = this.searchInput
        }
        if (this.dateOption === 'prod_created' && this.startDateInput && this.endDateInput) {
          query.dateOption = this.dateOption
          query.createStartDate = this.startDateInput
          query.createEndDate = this.endDateInput
        } else if (this.dateOption === 'prod_updated' && this.startDateInput && this.endDateInput) {
          query.dateOption = this.dateOption
          query.updatedStartDate = this.startDateInput
          query.updatedEndDate = this.endDateInput
        }
        if (this.sortingOption === 0) {
          query.sort_column = 'prod_id'
          query.sort = 'DESC'
        } else if (this.sortingOption === 1) {
          query.sort_column = 'prod_id'
          query.sort = 'ASC'
        } else if (this.sortingOption === 2) {
          query.sort_column = 'prod_name'
          query.sort = 'DESC'
        } else if (this.sortingOption === 3) {
          query.sort_column = 'prod_name'
          query.sort = 'ASC'
        } else if (this.sortingOption === 4) {
          query.sort_column = 'prod_sale'
          query.sort = 'DESC'
        } else if (this.sortingOption === 5) {
          query.sort_column = 'prod_sale'
          query.sort = 'ASC'
        } else if (this.sortingOption === 6) {
          query.sort_column = 'brand_name'
          query.sort = 'DESC'
        } else if (this.sortingOption === 7) {
          query.sort_column = 'brand_name'
          query.sort = 'ASC'
        }
        // page offset
        query.offset = (this.currentPage - 1) * this.pageSize
        query.limit = this.pageSize

        this.$http.get(`${url}/products`, {
          params: query
        })
        .then((result) => {
          this.products = result.data.data.productList
          this.searchCount = result.data.data.count
        })
      },
      update (pid) {
        let query = {}
        query.prod_id = pid
        query.prod_main = this.mainOption

        this.$http.get(`${url}/products/update`, {
          params: query
        })
          .then((result) => {
            this.clicked = []
            this.fetchList()
          })
      },
      fetchTotalCount () {
        this.$http.get(`${url}/products`)
        .then((result) => {
          this.totalCount = result.data.data.count
        })
      },
      changePage (page) {
        this.currentPage = page
        this.fetchList()
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
            .sorting{position:absolute; top:0px; right:0px;}
          }
        }
      }
    }
  }
  .table_type_02{
    .date{font-size:14px;}
  }
</style>

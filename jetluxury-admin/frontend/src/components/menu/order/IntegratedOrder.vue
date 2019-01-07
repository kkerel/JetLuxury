<template>
  <div class="contents_wrap">
    <!--<transition name='modal'>-->
      <!--&lt;!&ndash;-->
        <!--Component paths below ↓↓↓↓  from 'components/popup/MemoPopup'-->
      <!--&ndash;&gt;-->
      <!--<MemoPopup v-if="makeModal" :scrollPop="popupScroll" @close="popupClose(); makeModal = false"></MemoPopup>-->
    <!--</transition>-->
    <!--
      Component paths below ↓↓↓↓ import PageSubTitle from 'components/ui/PageTitle'
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
          <!-- 검색어 -->
          <div class="box_inner_wrap">
            <div class="box_title">검색어</div>
            <div class="box_contents">
              <!--
                Component paths below ↓↓↓↓  from 'components/ui/SearchSelect'
              -->
              <SearchSelect class="select" :items="searchOptions" :initValue="searchOption" @change="changeSearchOption"/>
              <div>
                <p v-if="searchOption === 'ordsheet_status'">
                  <BoardSelect :items="statusOptions" @change="changeSearchStatusOption"/>
                </p>
                <p v-else>
                  <input type="text" class="input_type_s" v-model="searchInput">
                </p>
              </div>
            </div>
          </div>
          <!-- 검색어 -->
          <!-- 기간선택 -->
          <div class="box_inner_wrap">
            <div class="box_title">기간선택</div>
            <div class="box_contents">
              <div>주문일</div>
              <!--<SearchSelectDate class="select" :items="dateOptions" :initValue="dateOption" @change="changeDateOption"/>-->
              <div><DatePicker v-model="startDateInput" :format="customFormatter"></DatePicker></div>
              <div> - </div>
              <div><DatePicker v-model="endDateInput" :format="customFormatter"></DatePicker></div>
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
            <!--
              Component paths below ↓↓↓↓  from 'components/ui/SearchSelect'
            -->
            <!--<SearchSelect class="sorting" :items="sortingOptions" :initValue="sortingOption" @change="changeSortingOption"/>-->
          </div>
          <div class="scroll__table__wrap">
            <table>
              <tr>
                <th>번호</th>
                <th>주문일시</th>
                <th>주문번호</th>
                <th>주문자</th>
                <th>개인통관번호</th>
                <th>주문상품</th>
                <th>상품금액</th>
                <th>총 배송비</th>
                <th>총 결제금액</th>
                <th>경과일자</th>
                <th>배송상태</th>
                <th>수정/수정완료</th>
              </tr>
              <tr v-for="(order, index) in orders">
                <td>{{index+1}}</td>
                <td>{{customFormatter(order.ordsheet_created)}}</td>
                <td>{{order.merchant_uid}}</td>
                <td>{{order.memb_id}}</td>
                <td>{{order.memb_code}}</td>
                <td>{{order.prod_name}}</td>
                <td>{{order.ord_price}}원</td>
                <td>{{order.ordsheet_cost}}원</td>
                <td>{{order.total}}원</td>
                <td>{{countDate(order.ordsheet_created)}}일</td>
                <td>
                  <p v-if="clicked[order]"><BoardSelect :items="statusOptions" @change="changeStatusOption"/></p>
                  <p v-else>{{ordStatus[order.ord_status]}}</p>
                </td>
                <td>
                  <button type="button" v-if="clicked[order]" class="btn_type_05" @click="update(order.ord_id, order.ordsheet_id)">수정완료</button>
                  <button v-else type="button" class="btn_type_04" @click="click(order)">수정</button>
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
  import DatePicker from 'vuejs-datepicker'
  import moment from 'moment'

  var url = '/back'
  const SEARCH_OPTIONS = [
    {name: '주문번호', value: 'merchant_uid'},
    {name: '배송상태', value: 'ordsheet_status'}
  ]
  // const SORT_OPTIONS = [
  //   {name: '주문번호↓', value: 0},
  //   {name: '주문번호↑', value: 1},
  //   {name: '상품명↓', value: 2},
  //   {name: '상품명↑', value: 3},
  //   {name: '총 결제금액↓', value: 4},
  //   {name: '총 결제금액↑', value: 5}
  // ]
  export default {
    name: 'IntegratedOrder',
    components: {
      PageTitle,
      PageSubTitle,
      SearchSelect,
      SearchResult,
      BoardSelect,
      Paging,
      DatePicker
    },
    mounted () {
      this.fetchTotalCount()
    },
    data () {
      return {
        orders: [],
        clicked: [],
        page: {
          title: '주문/배송',
          subTitle: '주문통합 리스트'
        },
        SubTitle: {
          title: '주문통합 리스트'
        },
        searchOptions: SEARCH_OPTIONS,
        // sortingOptions: SORT_OPTIONS,
        searchOption: SEARCH_OPTIONS[0].value,
        // sortingOption: SORT_OPTIONS[0].value,
        searchInput: '',
        startDateInput: '',
        endDateInput: '',
        totalCount: 0,
        searchCount: 0,
        currentPage: 1,
        pageSize: 20,
        ordStatus: {
          1: '결제 대기',
          2: '결제 완료',
          3: '상품 준비',
          4: '배송 중',
          5: '배송 완료',
          0: '취소'
        },
        statusOptions: [
          {name: '취소', value: 0},
          {name: '결제대기', value: 1},
          {name: '결제완료', value: 2},
          {name: '상품준비', value: 3},
          {name: '배송중', value: 4},
          {name: '배송완료', value: 5}
        ],
        statusOption: '',
        searchStatusOption: ''
      }
    },
    methods: {
      click (order) {
        this.$set(this.clicked, order, true)
      },
      changeSearchOption (searchOption) {
        this.searchOption = searchOption
      },
      // changeSortingOption (sortingOption) {
      //   this.sortingOption = sortingOption
      // },
      changeStatusOption (statusOption) {
        this.statusOption = statusOption
      },
      changeSearchStatusOption (statusOption) {
        this.searchStatusOption = statusOption
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
      countDate (ordsheetCreated) {
        var now = moment()
        var duration = moment.duration(now.diff(ordsheetCreated))
        var days = duration.asDays()
        return Math.floor(days)
      },
      search () {
        this.currentPage = 1
        this.fetchList()
      },
      fetchList () {
        let query = {}
        if (this.searchOption === 'merchant_uid') {
          query.merchant_uid = this.searchInput
        } else if (this.searchOption === 'ordsheet_status') {
          query.ordsheet_status = this.searchStatusOption
        }
        if (this.startDateInput && this.endDateInput) {
          // date 입력 안했을 시
          query.startDate = this.startDateInput
          query.endDate = this.endDateInput
        }
        // if (this.sortingOption === 0) {
        //   query.sort_column = 'merchant_uid'
        //   query.sort = 'DESC'
        // } else if (this.sortingOption === 1) {
        //   query.sort_column = 'merchant_uid'
        //   query.sort = 'ASC'
        // } else if (this.sortingOption === 2) {
        //   query.sort_column = 'prod_name'
        //   query.sort = 'DESC'
        // } else if (this.sortingOption === 3) {
        //   query.sort_column = 'prod_name'
        //   query.sort = 'ASC'
        // } else if (this.sortingOption === 4) {
        //   query.sort_column = 'ordsheet_total'
        //   query.sort = 'DESC'
        // } else if (this.sortingOption === 5) {
        //   query.sort_column = 'ordsheet_total'
        //   query.sort = 'ASC'
        // }

        query.offset = (this.currentPage - 1) * this.pageSize
        query.limit = this.pageSize

        this.$http.get(`${url}/order`, {
          params: query
        })
          .then((result) => {
            this.orders = result.data.orderList
            this.searchCount = result.data.count
          })
      },
      update (ordId, ordsheetId) {
        let query = {}
        query.ord_id = ordId
        query.ordsheet_id = ordsheetId
        query.ord_status = this.statusOption

        this.$http.get(`${url}/order/update`, {
          params: query
        })
          .then((result) => {
            this.clicked = []
            this.fetchList()
          })
      },
      fetchTotalCount () {
        this.$http.get(`${url}/order`)
          .then((result) => {
            this.totalCount = result.data.count
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
      }
    }
  }
  .table_type_03{
    td{font-size:14px;}
  }
    .alert{
        background-color:red;

    }

</style>

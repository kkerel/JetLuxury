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
        Component paths below ↓↓↓↓  from 'components/popup/EventPopup'
      -->
      <EventPopup v-if="EventPopupStatus" @close="EventPopupStatus = false"></EventPopup>
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
          <!-- 검색 -->
          <div class="box_inner_wrap">
            <div class="box_title">검색</div>
            <div class="box_contents">
              <!--
                Component paths below ↓↓↓↓  from 'components/ui/SearchSelect'
              -->
              <SearchSelect class="select" :items="searchOptions" :initValue="searchOption" @change="changeSearchOption"/>
              <div><input type="text" class="input_type_s"></div>
              <div class="process_choice_wrap">
                <ul class="radio_style">
                  <li>
                    <input type="radio" name="process" id="all" checked>
                    <label for="all">전체</label>
                  </li>
                  <li>
                    <input type="radio" name="process" id="cancelRegister">
                    <label for="cancelRegister">배너등록</label>
                  </li>
                  <li>
                    <input type="radio" name="process" id="Cancellationprocessing">
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
              <div><DatePicker v-model="startDateInput" :format="customFormatter" :clear-button="true"></DatePicker></div>
              <div> - </div>
              <div><DatePicker v-model="endDateInput" :format="customFormatter" :clear-button="true"></DatePicker></div>              <div class="term_choice_wrap">
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
            <div class="btn_type_01" @click="EventPopupStatus = true">신규등록</div>
          </div>
          <div class="scroll__table__wrap">
            <table>
              <tr>
                <th>번호</th>
                <th>페이지</th>
                <th>이벤트 배너 (기본형)</th>
                <th>이벤트 배너 (확대형)</th>
                <th>메인 노출여부</th>
                <th>링크</th>
                <th>등록일</th>
                <th>등록일</th>
                <th>수정/삭제</th>
              </tr>
              <tr v-for="(item,index) in this.$store.state.data">
                <td>{{index+1}}</td>
                <td>{{item.bann_type}}</td>
                <td>
                    <p v-if="clicked[index]"><input type="file" id="file" @change="filechanges(1)"></p>
                    <p v-else>{{item.bann_img}}</p>
                </td>
                <td>
                    <p v-if="clicked[index]"><input type="file" id="file" @change="filechanges(2)"></p>
                    <p v-else>{{item.bann_link}}</p>
                </td>
                <td>
                    <p v-if="clicked[index]">
                        <BoardSelect :items="exposureOptions" @change="changeExposure()"/>
                   </p>
                    <p v-else>노출</p></td>
                <td>
                    <p v-if="clicked[index]">
                      <input type="text" v-model="img_link" class="input_type_01"/></p>
                    <p v-else>http://m.jetluxury.com/event</p>

                </td>
                <td>{{customFormatter(item.bann_created)}}</td>
                <td>{{customFormatter(item.bann_updated)}}</td>
                <td>
                    <button v-if="clicked[index]" @click="saveChanges(item)" type="button" class="btn_type_05">
                        수정완료</button>
                    <p v-else>
                  <button @click="edit(index)" type="button"
                          class="btn_type_04">수정</button>
                  <button type="button" class="btn_type_03" @click="disableBanner(item.bann_id)">삭제</button>
                   </p>
                </td>
              </tr>
            </table>
          </div>
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
  import PageTitle from 'components/ui/PageTitle'
  import PageSubTitle from 'components/ui/PageSubTitle'
  import SearchSelect from 'components/ui/SearchSelect'
  import Paging from 'components/ui/Paging'
  import SearchResult from 'components/ui/SearchResult'
  import BoardSelect from 'components/ui/BoardSelect'
  import Popup from 'components/popup/Popup'
  import EventPopup from 'components/popup/EventPopup'
  import DatePicker from 'vuejs-datepicker'
  import moment from 'moment'

  var url = '/back'
  const SEARCH_OPTIONS = [
      {name: '브랜드명', value: 'brand_name'},
      {name: '브랜드국가', value: 'brand_coname'}
  ]
  const EXPOSURE_OPTIONS = [
      {name: '메인노출', value: 1},
      {name: '메인비노출', value: 0}
  ]

  export default {
    name: 'EventBanner',
    components: {
      PageTitle,
      PageSubTitle,
      SearchSelect,
      Paging,
      SearchResult,
      BoardSelect,
      Popup,
      EventPopup,
      DatePicker
    },
    mounted () {
      this.fetchList()
    },
    data () {
      return {
        popupStatus: false,
        EventPopupStatus: false,
        clicked: [],
        page: {
          title: '배너',
          subTitle: '이벤트배너'
        },
        SubTitle: {
          title: '이벤트배너'
        },
        popup: {
          prologue1: '글 삭제시 복구 하실 수 없습니다.',
          prologue2: '선택한 글을 삭제 하시겠습니까?'
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

        // data for updating banner
        exposureOptions: EXPOSURE_OPTIONS,
        bann_id: '',
        bann_exposure: '', // for expose or unexpose
        bann_link: '',  // for image link
        file1: '', // for basic image,
        file2: '' // for enlarged image
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
      // date formater
      customFormatter (date) {
        return moment(date).format('YYYY-MM-DD')
      },
      // change search option column select option handler
      changeSearchOption (searchOption) {
        this.searchOption = searchOption
      },
      // save changes for the edit
      saveChanges (item) {
        this.clicked = []
      },
      // changes the table row into forms
      edit (item) {
        // this.selected=status;
        // this.contact=admin_contact
        this.$set(this.clicked, item, true)
      },
      // disable banner (Delete)
      disableBanner (id) {
        this.popupStatus = true
        this.bann_id = id
      },
      // confirm disable after popup
      confirmDisable (confrimtion) {
        this.popupStatus = false
        if (confrimtion === 1) {
          this.$http.put(`${url}/banner/admin/disable`, {
            bann_id: this.bann_id
          }).then(result => {
            if (result.status === 200) {
              this.$store.state.success = result.data.msg
              this.fetchList()
            } else {
              this.$store.state.error = result.data.msg
            }
          }).catch(err => {
            this.$store.state.error = err.message
          })
        }
      },
      // handler for search button click
      search () {
        this.fetchList()
      },
      // making api request for Data
      fetchList () {
        let query = {}
        if (this.searchOption === 'admin_id' || this.searchOption === 'bann_type') {
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
        this.$http.get(`${url}/banner/admin/list`, {
          params: query
        })
          .then((result) => {
            this.banners = result.data.data.bannerList
            console.log(this.banners)
            this.totalCount = result.data.data.count
            this.searchCount = result.data.data.bannerList.length
            // add paginatio here
            // format pagination after result is done.
            if (this.banners.length > 1) {
              this.pagination = Math.ceil(this.banners.length / this.$store.state.perPage)
            }
            // update pagination state
            this.$store.dispatch('updatePagination', {
              pagination_no: this.pagination
            })
            // paginate
            this.$store.dispatch('paginate', {
              start: 0,
              end: this.$store.state.perPage,
              data: this.banners,
              active: 1
            })
          })
      },
      // method to handle action when browsing a file
      filechanges (number) { // accepts 1 for
        if (number === 1) {
          this.file1 = this.$refs.file.files[0]
        }
        if (number === 2) {
          this.file2 = this.$refs.files.files[1]
          alert(this.file2)
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

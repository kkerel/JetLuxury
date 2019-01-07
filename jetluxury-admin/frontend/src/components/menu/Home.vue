<template>
  <div class="page__contents__wrapper">
    <PageTitle :page="page"/>
    <div class="page__contents">
      <div class="page__contents--navi">
        <div @click="activate(0)" v-on:click="makeActive('Sales')" :class="{ on : active_el === 0 }">
          <span>매출</span>
          <span>{{totalSales-totalCancelled}}원</span>
        </div>
        <div @click="activate(1)" v-on:click="makeActive('Order')" :class="{ on : active_el === 1 }">
          <span>주문</span>
          <span>{{totalOrder}}&nbsp;건</span>
        </div>
        <div @click="activate(2)" v-on:click="makeActive('Member')" :class="{ on : active_el === 2 }">
          <span>신규회원</span>
          <span>{{active_sum}}&nbsp;명</span>
        </div>
      </div>
      <div>
        <div v-show="isActiveTab('Sales')">
          <!-- ui/home/Sales -->
          <Sales
            :totalSales="totalSales"
            :totalCancelled="totalCancelled"
            :chartDataForSales="chartDataForSales"
            :tableDataForSales="tableDataForSales"/>
        </div>
        <div v-show="isActiveTab('Order')">
          <!-- ui/home/Order -->
          <Order
            :totalOrder="totalOrder"
            :totalOrderQuantity="totalOrderQuantity"
            :chartDataForOrder="chartDataForOrder"
            :tableDataForOrder="tableDataForOrder"
            :chartDataForSales="chartDataForSales"
          />
        </div>
        <div v-show="isActiveTab('Member')">
          <!-- ui/home/Member -->
          <Member
            :chartdata="chartdata"
            :active_sum="active_sum"
            :passive_sum="passive_sum"
            :deactivate_sum="deactivate_sum"
            :tabledata="tabledata"
            :date_num="date_num"
          />
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  /* eslint-disable */
  import PageTitle from 'components/ui/PageTitle'
  import Sales from 'components/ui/Home/Sales'
  import Order from 'components/ui/Home/Order'
  import Member from 'components/ui/Home/Member'
  import axios from 'axios'
  import moment from 'moment'

  export default {
  name: 'Home',
  components: {
    PageTitle,
    Sales,
    Order,
    Member
  },
  data () {
    return {
      page: {
        title: '주요현황'
      },
      choice: 'Sales',
      active_el: 0,
      Sales: {
        isActive: false
      },
      Order: {
        isActive: false
      },
      Member: {
        isActive: false
      },

        /*
         * VARIABLES FOR BACKEND
         *
         */

        // chart data holder for sales chart
        chartDataForSales: [],
        //chart data holder for order
        chartDataForOrder:[],

       // table data holder for sales
        tableDataForSales:[],
      // table data holder for orders
        tableDataForOrder:[],

        options: {
            height: 500,
            responsive: true,
            legend: {
                position: 'center'
            }
        },
        totalOrder:0,
        totalOrderQuantity:0,
        totalSales:0,
        totalCancelled:0,
        active_members:0,
        status:0,
      // variables for new member
      memberList: null,
      chartdata: null,
      active_sum: 0,// sum of active members
      passive_sum: 0,// sum of passive members
      deactivate_sum: 0,// sum of deactivated lists
      tabledata: null,// variable for data table
      date_num: null
    }
  },

  created(){
        // GET SalesPriceList OF DATA
        const url  = '/back';
        axios.get(`${url}/sales/report`)
            .then(result=>{

                 // total statistics
                this.totalSales = result.data.total.totalSales;
                this.totalOrder = result.data.total.totalOrders;
                this.totalOrderQuantity = result.data.total.totalOrderQuantity;
                this.totalCancelled = result.data.total.totalCancelled;

                // table and chart data for sales
                this.chartDataForSales=result.data.chartDataForSales;
                this.tableDataForSales =result.data.tableDataForSales;

                 // get chart data for for order tab
                this.chartDataForOrder = result.data.chartDataForOrder;
                this.tableDataForOrder = result.data.tableDataForOrder;

            });
// calling member API
      axios.get(`${url}/member/report`)
          .then(result=>{
            //
            this.memberList = result;
            var active = this.memberList.data.active;
            var passive = this.memberList.data.passive;
            var deactivate = this.memberList.data.deactivated;
            this.date_num = this.memberList.data.dates.length;
            this.chartdata = this.memberList.data.chartdata.slice();
            this.memberList.data.chartdata.splice(0, 1) // remove the headers to make suitable to the data tables
            this.tabledata = this.memberList.data.chartdata;// the spliced array
            for (var index in active) {
              this.active_sum += active[index].count
            }
            for (var index in passive) {
              this.passive_sum += passive[index].count
            }
            for (var index in deactivate) {
              this.deactivate_sum += deactivate[index].count
            }
          })

  },
    methods: {
      /*
       * function for working with the frontend
      */

    activate: function (el) {
      this.active_el = el
    },
    makeActive: function (val) {
      this.choice = val
    },
    isActiveTab: function (val) {
      return this.choice === val
    },

      /*
       *
       * Function for working with the backend.
       *
       */
      formatDate: function(datetime) {
          let date = moment(datetime).utc().format("MM/DD");
          return date;
      },

      compare:function(date,sales,index){
          for(var i = 0;i<sales.length;i++){
              if(this.formatDate(date)===this.formatDate(sales.ord_created)){
                  return sales[i].sum;
              }
          }
          return 0;
      }
  }
}
</script>

<style lang="scss" scoped>
  /* home 페이지 에서만 적용*/
  .page_title{margin-bottom:40px!important;}
  // 탭 기본 color
  $bg-color1:#f5f5f5;
  // 탭 active color
  $bg-color2:#444857;
  .page__contents{
    &--navi{width:100%; display:table;
      > div{width:33.3333%; height:60px; line-height:60px; text-align:center; border:1px solid #ccc; background:$bg-color1; float:left; box-sizing:border-box; cursor:pointer; font-size:20px;
        &:nth-child(2){border-left:0px; border-right:0px;}
        &.on{background:$bg-color2; color:#fff; font-weight:bold;}
      }
    }
  }
</style>

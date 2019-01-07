<template>
  <article class="chart_status_wrap">
    <section class="board_wrap shadow">
      <div class="title">
        <span>&middot;</span>매출현황
      </div>
      <!--table For Sales -->
      <table>
        <colgroup>
          <col width="25%">
          <col width="25%">
          <col width="25%">
          <col width="25%">
        </colgroup>
        <tr>
          <th>날짜</th>
          <th>판매금액</th>
          <th>취소금액</th>
          <th>매출금액</th>
        </tr>
        <tr v-for="data in tableDataForSales">
          <template v-for="inside in data">
            <td>{{inside}}</td>
          </template>
        </tr>
        <tr>
          <td><b>{{tableDataForSales.length}}일 합계</b></td>
          <td><b>{{totalSales}}</b></td>
          <td><b>{{totalCancelled}}</b></td>
          <td><b>{{totalSales-totalCancelled}}</b></td>
        </tr>
      </table>
      <!--/Table For Sales-->
    </section>
    <section class="graph_wrap shadow">
      <GChart
        type="LineChart"
        :data="chartDataForSales"
        :options="options"
      />
    </section>

  </article>
</template>

<script>
    /* eslint-disable */
  import HomeBoard from 'components/ui/HomeBoard'
  import { GChart } from 'vue-google-charts'
  import axios from 'axios'
  import moment from 'moment'
  export default {
    name: 'Order',
    components: {
      HomeBoard,
      GChart
    },
      props:{

          totalSales:Number,
          totalCancelled:Number,
          chartDataForSales:Array,
          tableDataForSales:Array,

      },
      data () {
      return {
         options: {
          height: 500,
          responsive: true,
          legend: {
            position: 'center'
          }
        },


      }
    },
  }
</script>

<style lang="scss" scoped>
    $border-color:#ccc;
    $basic-size:16px;
    table{width:100%;
        th{background:#444857; height:48px; line-height:48px; color:#fff; font-size:$basic-size; border-right:1px solid $border-color;
            &:first-child{border-left:0px;}
            &:last-child{border-right:0px;}
        }
        td{height:48px; line-height:48px; text-align:center; border-right:1px solid $border-color; border-bottom:1px solid $border-color; font-size:$basic-size; font-weight:normal;
            &:nth-child(4n){border-right:0px;}
        }
    }
</style>

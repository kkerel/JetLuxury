<template>
  <article class="chart_status_wrap">
    <section class="board_wrap shadow">
      <div class="title">
        <span>&middot;</span>주문현황
      </div>
      <!-- order table -->
      <table>
        <colgroup>
          <col width="33%">
          <col width="33%">
          <col width="33%">
        </colgroup>
        <tr>
          <th>날짜</th>
          <th>구매건수</th>
          <th>구매개수</th>
        </tr>
        <tr v-for="data in tableDataForOrder">
          <template v-for="inside in data">
            <td>{{inside}}</td>
          </template>
        </tr>
        <tr>
          <td><b>{{tableDataForOrder.length}}일 합계</b></td>
          <td><b>{{totalOrder}}</b></td>
          <td><b>{{totalOrderQuantity}}</b></td>
        </tr>
      </table>
      <!-- order table -->
    </section>
      <section class="graph_wrap shadow">
          <GChart
                  type="LineChart"
                  :data="chartDataForOrder"
                  :options="options"
          />
      </section>
  </article>
</template>

<script>
  /* eslint-disable */

  import {GChart} from 'vue-google-charts'
  import moment from 'moment'

  export default {
    name: 'Order',
      props:{

          totalOrder:Number,
          totalOrderQuantity:Number,
          chartDataForOrder:Array,
          tableDataForOrder:Array,

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

<template>
  <article class="chart_status_wrap">
    <section class="board_wrap shadow">
      <div class="title">
        <span>&middot;</span>회원현황
      </div>
      <!-- ui/memberboard -->
      <MemberBoard
        :tabledata="tabledata"
        :active_sum="active_sum"
        :passive_sum="passive_sum"
        :deactivate_sum="deactivate_sum"
        :date_num="date_num"
      />
    </section>
    <section class="graph_wrap shadow">
      <GChart
        type="LineChart"
        :data="chartdata"
        :options="options"
      />
    </section>
  </article>
</template>

<script>
  /*eslint-disable*/
  import MemberBoard from 'components/ui/MemberBoard'
  import axios from 'axios'
  //  import { GChart } from 'vue-google-charts'
  export default {
    name: 'member',
    components: {
      MemberBoard
    },
    props: {

      chartdata: Array,
      tabledata: Array,
      active_sum: Number,
      passive_sum: Number,
      deactivate_sum: Number,
      date_num: Number
    },
    data () {
      return {
        options: {
          height: 500,
          responsive: true,
          legend: {
            position: 'center'
          }
        }
      }
    }
  }
</script>

<style lang="scss" scoped>
</style>

/* eslint-disable */
<template>
  <table>
    <colgroup>
      <col width="25%">
      <col width="25%">
      <col width="25%">
      <col width="25%">
    </colgroup>
    <tr>
      <th>날짜</th>
      <th>신규회원</th>
      <th>탈퇴회원</th>
      <th>휴먼회원</th>
    </tr>
    <tr v-for="out in tabledata">
      <template v-for="item in out">
      <td>{{item}}</td>

      </template>
    </tr>

    <!-- total -->
    <tr>
      <td><b>{{date_num}}일 합계</b></td>
      <td><b>{{active_sum}}</b></td>
      <td><b>{{deactivate_sum}}</b></td>
      <td><b>{{passive_sum}}</b></td>
    </tr>

  </table>

</template>

<script>
    /* eslint-disable */
    import axios from 'axios'
    import moment from 'moment'
export default {
  name: 'Memberboard',
  props: {
    tabledata: Array,
    active_sum: Number,
    passive_sum: Number,
    deactivate_sum: Number,
    date_num: Number
  }
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

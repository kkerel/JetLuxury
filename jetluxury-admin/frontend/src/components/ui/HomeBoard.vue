/* eslint-disable */
<template>
  <table>
    <colgroup>
      <col width="25%">
      <col width="25%">
      <col width="25%">

    </colgroup>
    <tr>
      <th>날짜</th>
      <th>구매건수</th>
      <th>구매개수</th>
    </tr>
    <tr v-for="(date,index) in dates">
      <td>{{formatDate(date)}}</td>
      <td>

                  <span v-for="item in salesList">
                     <span v-if="formatDate(item.ord_created) === formatDate(date)">
                         {{item.sum}}
                     </span>
                 </span>

      </td>
      <td>


      </td>
      <td>{{compare(salesList,cancelList,index)}}</td>
    </tr>
    <tr>
      <td><b>{{totalDays}}일 합계</b></td>
      <td><b>{{totalSales}}</b></td>
       <td><b> <span v-if="totalCancelled">{{totalCancelled}}</span>
           <span v-else>0</span></b></td>
      <td><b>{{netSold}}</b></td>
    </tr>
  </table>
</template>

<script>
    /* eslint-disable */
    import axios from 'axios'
    import moment from 'moment'
export default {
    data () {
        return {

            /** VARIABLES FOR BACKEND
             *
             */
            dates:[],
            totalOrder:0,
            totalSales:0,
            totalCancelled:0,
            cancelList:null,
            totalDays :0,
            netSold:0,
            salesList:null,
            status:null,
        }
    },
    created(){

        // GET SalesPriceList OF DATA
        const url  = '/back';
        axios.get(`${url}/sales/report`)
            .then(result=>{
                this.salesList = result.data.data.salesList;
                this.cancelList = result.data.data.cancelList;
                this.totalSales = result.data.data.total.totalSales;
                this.totalCancelled = result.data.data.total.totalCancelled;
                this.netSold = this.totalSales-this.totalCancelled;
            });

        var days=moment().format("YYYY-MM-DD HH:mm:ss");
        var sunday=moment().day("Sunday").format("YYYY-MM-DD 23:59:00");
        for(var i=0,j=1;days>=sunday;j++,i++)// j is iterator for the moment.subtract(), i is an index for the array
        {
            this.dates[i]=moment(days).format("YYYY-MM-DD HH:mm:ss");
            days=moment().subtract(j, 'days').format("YYYY-MM-DD HH:mm:ss");
        }
        this.dates=this.dates.sort();
        this.totalDays = this.dates.length;

    },
    methods:{
        formatDate: function(datetime) {
            let date = moment(datetime).utc().format("MM/DD");
            return date;
        },
        compare:function(sales,cancel,index){
            if(sales.length>=index&&cancel.length>=index){
                return 1; // cancelled !=0 , net = sales-cancel
            }else if(sales.length>=index&&cancel.length<=index){
                return 2 // no cancelled order , net = sales,
            }else{
                return 3;
            }

        }
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

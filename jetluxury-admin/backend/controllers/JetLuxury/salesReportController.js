
var models  = require('../../models/index');
var Sequelize = require("sequelize");
const Op = Sequelize.Op;
var moment = require('moment');
var request = require('request');

var env       = process.env.NODE_ENV || 'development';
var config    = require('../../config/config.js')[env];
var apiUrl = config.apiUrl+'/admin/';

module.exports = {

    /**
     * GENERAL STEPS ,
     *  ======================
     *  STEP 1 , GET DATA FROM THE API
     *  STEP 2 , FORMAT THE DATA INTO TABLE DATA AND CHART DATA
     *  ========================================================
     *   ABOUT CHART :
     *   ====================
     *    CHART FOR SALES AND CHART FOR ORDER
     *
     *    -------------
     *    ABOUT TABLES
     *    -------------
     *       TABLES = CHART WITH OUT CAPTION
     *       TABLE FOR ORDER AND TABLE FOR SALES
     */

    getMass: function (req,res) {

        var status = req.query.status;
        var options = {
            method: 'GET',
            url: apiUrl+'sales/report',
            qs: {
                data: {
                    status: status
                }
            }
        };
        request(options, function (error, response, data) {

            if(error)
                res.send("Get Report Error :"+error);
            else
            {
                try{

                    // format data for chart chardata both for sales and order
                    var chartDataForSales=[];
                    var chartDataforOrder=[];

                    // columns for the chart and table
                    var columns = [];
                    var columnsforOrder = [];

                    // caption variables
                    var captionForSalesGraph = 'Day,매출,판매,취소';
                    var captionForOrderGraph='Day,구매건수,구매';

                    // change the caption into array
                    captionForSalesGraph = captionForSalesGraph.split(',');
                    captionForOrderGraph = captionForOrderGraph.split(',');

                    //push the capiton array into columns
                    for (var i = 0; i < 4; i++) {

                        columns.push(captionForSalesGraph[i]);
                        // because the ordertable has three components
                        if(i<3) {
                            columnsforOrder.push(captionForOrderGraph[i]);
                        }
                    }

                    //push columns to chartDataForSales and chartDatForOrer
                    chartDataForSales.push(columns);
                    chartDataforOrder.push(columnsforOrder);

                    // get all dates
                    var dates =getDates();

                    // formated data from request
                    var jsonFormat =JSON.parse(data);

                     // accept the sales,order and cancel list from the api result
                    var salesList =jsonFormat.data.salesList;
                    var cancelList =jsonFormat.data.cancelList;
                    var orderList = jsonFormat.data.orderList;


                    // iteratively add the list into columns and then push
                    var isExisted = 0;

                    for(var date =0;date<dates.length;date++){

                        // reset columns
                        columns=[];
                        columnsforOrder=[];

                        // hold values for sales and canelled list in each row
                        var holdsale = 0;
                        var holdcancel =0;


                        // sales list chart data formatter
                        // push date to  chart columns
                        columns.push(dates[date]);
                        columnsforOrder.push(dates[date]);

                        for(var index=0;index<salesList.length;index++){
                            var stringDate =formatDate(salesList[index].ord_created);
                            if(dates[date] == stringDate){
                                isExisted =1;
                                holdsale=parseInt(salesList[index].sum);
                                columns.push(holdsale);
                            }
                        }
                        if(isExisted==0){
                            columns.push(0);
                            holdsale=0;
                        }
                        else{
                            isExisted = 0; // for the next loop
                        }


                        // cancelList column push
                        for(var index1=0;index1<cancelList.length;index1++){

                            var stringDate = formatDate(cancelList[index1].ord_created);
                            if(dates[date] === stringDate){

                                isExisted =1;
                                holdcancel=parseInt(cancelList[index1].sum);
                                columns.push(holdcancel);
                            }
                        }

                        if(isExisted==0){
                            columns.push(0);
                            holdcancel=0;
                        }
                        else{
                            isExisted = 0; // for the next loop
                        }

                        for(var index2=0;index2<orderList.length;index2++){

                            var stringDate = formatDate(orderList[index2].ord_created);
                            if(dates[date] === stringDate){

                                isExisted =1;
                                columnsforOrder.push(parseInt(orderList[index2].count));
                                columnsforOrder.push(parseInt(orderList[index2].sum));
                            }
                        }
                        if(isExisted==0){

                            columnsforOrder.push(0); // push the number at
                            columnsforOrder.push(0);   //push total order quantity
                        }
                        else{
                            isExisted = 0; // for the next loop
                        }

                        // push the net to columns
                        columns.push(holdsale-holdcancel);
                        //push the columns to the chart
                        chartDataForSales.push(columns);
                        chartDataforOrder.push(columnsforOrder);

                    }

                    // then format the data for tables too
                    var tableDataForSales = chartDataForSales.slice();
                    tableDataForSales.splice(0,1);

                    //copy the chart data
                    var tableDataForOrder = chartDataforOrder.slice();

                    // remove the header(capitons of the graph)
                    tableDataForOrder.splice(0,1)


                    // Last : total data. related variables
                       var totalSales = 0;
                       var totalOrders =0;
                       var totalCancelled =0;
                       var totalOrderQuantity=0;

                       // update them if the data returned is not empty

                      if(jsonFormat.data.total.totalSales){
                          totalSales = jsonFormat.data.total.totalSales;
                      }

                    if(jsonFormat.data.total.totalOrder){
                        totalOrders = jsonFormat.data.total.totalOrder;
                    }

                    if(jsonFormat.data.total.totalCancelled){
                        totalCancelled = jsonFormat.data.total.totalCancelled;
                    }

                    if(jsonFormat.data.total.totalOrderQuantity){
                        totalOrderQuantity = jsonFormat.data.total.totalOrderQuantity;
                    }


                    // check if any of the total values are null , if null set them to 0
                    //

                    // RETURN CHART DATA , AND SOME TOTAL ANALYSIS DATA

                    res.json({
                              total:{
                                  totalSales:totalSales,
                                  totalOrders:totalOrders,
                                  totalOrderQuantity:totalOrderQuantity,
                                  totalCancelled:totalCancelled
                              },
                              chartDataForSales:chartDataForSales,
                              chartDataForOrder:chartDataforOrder,
                              tableDataForSales:tableDataForSales,
                              tableDataForOrder:tableDataForOrder
                             });

                }
                catch (e) {
                    console.log("Error :"+e.message);
                }
            }
        });

    },

}
 function getDates() {
    var dates=[];
    var days=moment().format("YYYY-MM-DD HH:mm:ss");
    var sunday=moment().day("Sunday").format("YYYY-MM-DD 23:59:00");
    if(moment().day()==0){
        sunday=moment().subtract(7,"days").format("YYYY-MM-DD 23:59:00")
    }
    for(var i=0,j=1;days>=sunday;j++,i++)// j is iterator for the moment.subtract(), i is an index for the array
    {
        dates[i]=formatDate(moment(days).format("YYYY-MM-DD HH:mm:ss"));
        days=moment().subtract(j, 'days').format("YYYY-MM-DD HH:mm:ss");
    }
    dates=dates.sort();
    return dates;
}
function formatDate(date){
    return moment(date).utc().format("MM/DD");
}

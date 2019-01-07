/**
 * Created by Gebru on 11/20/2018.
 */

var request = require('request');
var async = require('async');
const axios = require('axios');
var HTTPStatus = require('http-status');
var responseJson = require('../../lib/responseJson');
var moment = require('moment');

var env       = process.env.NODE_ENV || 'development';
var config    = require('../../config/config.js')[env];
var apiUrl = config.apiUrl+'/admin';

module.exports= {
    /**
     * member statistics
     * GET /member/report
     * @param no more parameters
     *
     * return  number of members for each  memb_status category grouped by the date
     *
     */
    getMember: function (req, res) {
        var activeList = [];//stores active members only
        var passiveList=[];// stores passive members their last login were before six months
        var deactiveList=[];// stores members which their accounts are blocked
        var memberList=[];
        var dates=[]// days of week
        var six_months=[]; // stores passive members were do login before six months from the days of week
        var returnFalse = {
            status: HTTPStatus.PRECONDITION_FAILED,
            msg: '다시 시도해 주세요.'
        };

        var parseFailed = {
            status: HTTPStatus.NOT_ACCEPTABLE,
            msg: 'JSON file could not be parsed properly'
        };
        try {
            var resultCode = HTTPStatus.PRECONDITION_FAILED;
            var options = {
                method: 'GET',
                uri: apiUrl + "/member/report"
            }
            // call the APi
            request(options, function (err, result, data) {
                if (err) {
                    return res.json(returnFalse)
                }
                var qnaCount = 0;
                try{
                    memberList=JSON.parse(data)
                    var days=moment().format("YYYY-MM-DD HH:mm:ss");
                    var sunday=moment().day("Sunday").format("YYYY-MM-DD 23:59:00");
                    if (moment().day() == 0)//check if today is sunday then intialize sunday to the last Sunday
                    {
                        sunday = moment().subtract(7, 'days').format("YYYY-MM-DD 23:59:00")
                    }
                    for(var i=0,j=1;days>=sunday;j++,i++)// j is iterator for the moment.subtract(), i is an index for the array
                    {
                        dates[i]=moment(days).format("MM/DD");
                        six_months[i]= days;
                        days=moment().subtract(j, 'days').format("YYYY-MM-DD HH:mm:ss");
                    }
                    dates=dates.sort();
                    six_months=six_months.sort()
                }catch(e){
                    return e.message
                }
                if(memberList.data.length > 0){
                    for(var j in dates){
                        for (var i in memberList.data) {
                            var memb_created=moment(memberList.data[i].memb_created).format("MM/DD");// converting the datetime format to MM/DD
                            var memb_updated=moment(memberList.data[i].memb_updated).format("MM/DD");
                            var last_login=moment(memberList.data[i].memb_last_login).format("MM/DD");
                            if (memb_created == dates[j]) {
                                if (memberList.data[i].memb_status == 1) {
                                    activeList.push({date:dates[j],count:memberList.data[i].count})
                                }
                            }
                            if (memberList.data[i].memb_status == 0 && memb_updated == dates[j]) {
                                deactiveList.push({date:dates[j],count:memberList.data[i].count})
                            }
                            if (memberList.data[i].memb_status == 2 && last_login == (moment(six_months[j]).subtract(6, 'months').format("MM/DD"))) {
                                passiveList.push({date:dates[j],count:memberList.data[i].count})
                            }
                        }
                    }
                }

                var chartdata = formatChartData(dates, activeList, passiveList, deactiveList);
                if (!chartdata) {
                    return res.json({error: "chart data is null."})
                }
                resultCode = HTTPStatus.OK; // api 호출 성공했을때
                return res.json({
                    dates: dates,
                    active: activeList,
                    passive: passiveList,
                    deactivated: deactiveList,
                    chartdata: chartdata
                });
            });

        } catch (e) {
            return e.message;
        }

    },

/**
 * member status report
 * GET /member/status
 *
 *@param  memb_status
 *
 * return  grouped number of member  for the specific status(active or passive or deactivated)
 */

getMemberStatus: function (req, res) {

    var memb_status ='active' //req.params.memb_status;
    var memberList=[];
    var returnFalse = {
        status: HTTPStatus.PRECONDITION_FAILED,
        msg: '다시 시도해 주세요.'
    };

    var parseFailed = {
        status: HTTPStatus.NOT_ACCEPTABLE,
        msg: 'JSON file could not be parsed properly'
    }

    try {
        var resultCode = HTTPStatus.PRECONDITION_FAILED;


        var options = {
            method: 'GET',
            uri: apiUrl + "/member/status",
            qs: {
                data: {
                    memb_status:memb_status
                }
            }
        }

        // call the APi
        request(options, function (err, result, data) {
            if (err) {
                // return responseJson.make(res, returnFalse);
                return res.json({returnFalse})
            }
            var qnaCount = 0;
            try{
                memberList = JSON.parse(data);
            }catch(e){
                return callback({method: 'getMemberStatus', parseFailed})
            }
            resultCode = HTTPStatus.OK; // api 호출 성공했을때
            return res.json({memb_status: memberList});
        });

    } catch (e) {
        return responseJson.make(res, returnFalse);
    }
    1
}
}

function formatChartData(dates, active, passive, deactivated) {

// GET member LIST OF DATA
    var columns = [];//intermidate variable to store the splitted data from the array
    var chartData = [];// variable to store the last formatted chart data
    var isExist = 0;// variable to count if the specific day has active, or passive or deactivated members
    var variable = 'Day,매출,판매,취소'
    variable = variable.split(',')// split the column name by comma to push to the database

    for (var i = 0; i < 4; i++) {// 4 since the columns are 4
        columns.push(variable[i])// iterate and push to the array
    }
    chartData.push(columns)// at initial stage push the headers to the chart data array
    for (var date in dates) {// iterate over the dates
        columns = [];
        for (var index in active) {// iterate over the active members object with has number of active members for the specific day
            if (dates[date] == active[index].date) {
                columns.push(dates[date])
                columns.push(parseInt(active[index].count))// convert  the chart data columns value to integer
                isExist = 1;
            }
        }
        if (isExist == 0) {// if the member not existed in push zero
            columns.push(dates[date])
            columns.push(0)

        }
        else {
            isExist = 0;// reset isExist  for the next loop
        }
        for (var index in deactivated) {//iterate over the active members object with has number of deactivated members for the specific day
            if (dates[date] == deactivated[index].date) {
                columns.push(parseInt(deactivated[index].count))
                isExist = 1;
            }
        }
        if (isExist == 0) {
            columns.push(0)
        }
        else {
            isExist = 0;
        }
        for (var index in passive) {// iterate over the active members object with has number of passive members for the specific day
            if (dates[date] == passive[index].date) {
                columns.push(parseInt(passive[index].count))
                isExist = 1;
            }
        }
        if (isExist == 0) {
            columns.push(0)
        }
        else {
            isExist = 0;
        }
        chartData.push(columns)
    }

    return chartData;
}
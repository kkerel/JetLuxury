
var HTTPStatus = require('http-status');
var request = require('request');
var env       = process.env.NODE_ENV || 'development';
var config    = require('../../config/config.js')[env];
var apiUrl = config.apiUrl+'/';
var multer = require('multer');

var storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, './public/uploads/images/brand/')
    },
    filename: (req, file, cb) => {
        console.log(file.fieldname);
        cb(null, file.fieldname + "-" + Date.now() + "-" + file.originalname)
    }
});

var upload = multer({storage: storage});

var returnFalse = {
    status: HTTPStatus.PRECONDITION_FAILED,
    msg: '다시 시도해 주세요.'
};

var parseFailed = {
    status: HTTPStatus.NOT_ACCEPTABLE,
    msg: 'JSON file could not be parsed properly'
};


module.exports = {
    /**
     * brand list
     * GET /brand/list
     * @param  start date, keyword, banner registration, col_name: brand_name and brand_coname
     * @returns brand list
     *
     */
    getBrandList: function (req, res) {

        if (!req.query) { // if there is not any search parameters returns error error message
            return res.send({
                status: HTTPStatus.PRECONDITION_FAILED,
                msg: 'getBannerList: No data provided.'
            })
        }
        try {
            var options = {
                method: 'GET',
                url: apiUrl + 'api/brand/admin/list',
                qs: {
                    data: req.query
                }
            };
            request(options, function (error, response, result) {
                if (error) {
                    res.json(error);
                }
                else {
                    try {
                        if (result) {
                            var formatedData = JSON.parse(result);
                            console.log(result)
                            res.json(formatedData);

                        } else {
                            res.json({status: 400, msg: '정보를 가져오지 못하였습니다.'});
                        }
                    } catch (e) {
                        return res.json({method: 'getBannerList', msg: parseFailed})
                    }
                }
            });
        } catch (e) {
            res.send(e.message);
        }
    },
    /**
     * create brand banner
     * POST /brand/create
     * @param brand data
     * @returns brand list
     *
     */

    updateBrandImage: function(req,res){
        const img_url = 'Url';
        if(!req.body){
            return res.json({status: HTTPStatus.PRECONDITION_FAILED, msg: 'Cannot read brand id'})
        }
        var options = {
            method: 'put',
            uri: apiUrl + "api/brand/admin/updateBrandImage",
            json: true,
            body: {
                data :{
                    brand_id: req.body.brand_id,
                    img_path: req.file.filename // the file name
                }
            }

        };
        // call api
        request(options, function (err, response, result) {
            if(err){
                return res.json({result: 'ERROR', status: returnFalse,error:err});
            }else {
                try {
                     // createdBrandList =JSON.parse(result); // TODO: check if data is valid json file
                      return res.json({result:result,dir:img_url})

                } catch (e) {
                    return res.json({method: 'createBrand', parseFailed,error:e.message})
                }
            }
        });
},
    upload

}
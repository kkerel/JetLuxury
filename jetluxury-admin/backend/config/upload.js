const multer = require('multer');

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

module.exports = upload;

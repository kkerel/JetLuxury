var express = require('express');
var path = require('path');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var session = require('express-session');
var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');

app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
// to serve the static files
// app.use("/images",express.static(path.join(__dirname,'uploads')));

app.use(session({
    key: 'admin_id',
    secret: 'secretkey',
    resave: false,
    saveUninitialized: false,
    cookie: {
        expires: 600000
    }
}));

var testRouter = require('./routes/testRoutes');
var indexRouter = require('./routes/index');
app.use('/test', testRouter);
app.use('/', indexRouter);

app.use(require('connect-history-api-fallback')());

// catch 404 and forward to error handler
app.use(function (req, res, next) {
    var err = new Error('Not Found');
    err.status = 404;
    next(err);
});

// error handler
app.use(function (err, req, res, next) {
    // set locals, only providing error in development
    res.locals.message = err.message;
    res.locals.error = req.app.get('env') === 'development' ? err : {};

    // render the error page
    res.status(err.status || 500);
    res.render('error');
});

app.get('/', function (req, res, next) {
    res.sendfile('./public/index.html')
});

module.exports = app;

var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
const mysql = require('mysql');


var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

const db = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "",
    database: "admindb"
})


app.use(function(err, req, res, next) {
    // set locals, only providing error in development
    res.locals.message = err.message;
    res.locals.error = req.app.get('env') === 'development' ? err : {};

    // render the error page
    res.status(err.status || 500);
    res.render('error');
});



app.get('/Complaint', (req, res) => {
    res.render('Complaint.ejs')
})

app.get('/Confirmation', (req, res) => {
    res.render('Confirmation.ejs')
})

app.get('/Contact', (req, res) => {
    res.render('Contact.ejs')
})

app.get('/history', (req, res) => {
    res.render('history.ejs')
})

app.get('/home', (req, res) => {
    res.render('home.ejs')
})

app.get('/payment', (req, res) => {
    res.render('payment.ejs')
})

app.get('/PlanTrip', (req, res) => {
    res.render('PlanTrip.ejs')
})

app.get('/Rate', (req, res) => {
    res.render('Rate.ejs')
})

app.get('/Report', (req, res) => {
    res.render('Report.ejs')
})

app.get('/Request', (req, res) => {
    res.render('Request.ejs')
})

app.get('/Routes', (req, res) => {
    res.render('Routes.ejs')
})

app.get('/Seat', (req, res) => {
    res.render('Seat.ejs')
})

app.get('/Tracking', (req, res) => {
    res.render('Tracking.ejs')
})

app.get('/Update', (req, res) => {
    res.render('Update.ejs')
})

app.get('/cookies', (req, res) => {
    res.render('cookies.ejs')
})

app.get('/indexu', (req, res) => {
    res.render('indexu.ejs')
})

app.get('/homeu', (req, res) => {
    res.render('homeu.ejs')
})


app.listen(5500, () => {
    console.log("Listening app...");
})
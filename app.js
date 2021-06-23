var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');

var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');
var app = express();
//my code--------------------------------------------
app.use(express.json());
var test =require('./routes/test');
var Router=require('./routes/Router')
var db= require('./db');
const session = require('express-session');
const MySQLStore = require('express-mysql-session')(session);
// db.connect((err)=>{
//   if(err){
//     console.log(err);
//     throw err;
//   }
// });
const sessionstore= new MySQLStore({
  expansion: (1825* 86400*1000),
  endConnectionclose:false
},db);
app.use(session({
    key:'44235fhafh982f31f31c112rc1rc',
    secret:'f23c42c4c34c2v3v25v235c25c43',
    store:sessionstore,
    resave:false,
    saveUninitialized: false,
    cookie: {
        maxAge:(1825* 86400*1000),
        httpOnly:false
    }
}));
new Router(app,db);


app.use(express.static(path.resolve(__dirname, './build')));

//------------------------------------------
// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);
app.use('/users', usersRouter);
//This is my Code :
app.use('/test', test);
// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;

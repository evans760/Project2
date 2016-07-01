var express = require('express');
var ejsLayouts = require('express-ejs-layouts');
var bodyParser = require('body-parser');
var session = require('express-session');
var passport = require('./config/ppConfig');
var path = require('path')
var flash = require('connect-flash');




var isLoggedIn = require('./middleware/isLoggedIn');
var app = express();

app.set('view engine', 'ejs');
app.use(express.static(path.join(__dirname, 'public')))
app.use(require('morgan')('dev'));
app.use(bodyParser.urlencoded({
    extended: false
}));
app.use(ejsLayouts);
app.use(session({
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: true
}));
app.use(passport.initialize());
app.use(passport.session());
app.use(flash());
app.use(function(req, res, next) {
    res.locals.alerts = req.flash();
    res.locals.currentUser = req.user;
    next();
});

app.get('/', function(req, res) {
    res.render('index');
});

app.get('/profile', isLoggedIn, function(req, res) {
    res.render('profile');
});

app.use('/auth', require('./controllers/auth'));
app.use('/sessions', require('./controllers/sessions'));
app.use('/users', require('./controllers/users'));
// When a user goes to localhost:3000/beaches, use the following controller:
app.use('/beaches', require('./controllers/beaches'));

var server = app.listen(process.env.PORT || 3000);

module.exports = server;

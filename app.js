let express = require('express');
let path = require('path');
let mongoose = require('mongoose');
let bodyParser = require('body-parser');
let expressValidator = require('express-validator');
let flash = require('connect-flash');
let session = require('express-session');
let passport = require('passport');
let config = require('./config/database');

//connect to database
mongoose.connect(config.database);
let db = mongoose.connection;

//check connections
db.once('open', function(){
    console.log("Connected to the database");
});

//check for db errors
db.on('error', function(err){
    console.log(err);

});

//init app
const app = express();

//bring in models
let Post = require('./models/post');

//load view engine
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');

// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }))

// parse application/json
app.use(bodyParser.json())

//set public folder, for static files
app.use(express.static(path.join(__dirname, 'public')));

//Express Session MiddleWare
app.use(session({
    secret: 'keyboard cat',
    resave: true,
    saveUninitialized: true,
})); 

//Express Messages Middleware
app.use(require('connect-flash')());
app.use(function (req, res, next){
    res.locals.messages = require('express-messages')(req, res);
    next();
});

//Express Validator Middleware
app.use(expressValidator({
    errorFormattor: function(param, msg, value){
        var namespace = param.split('.')
        , root = namespace.shift()
        , formParam = root;

        while(namespace.length){
            formParam += '[' + namespace.shift() + ']';
        }

        return {
            param: formParam,
            msg: msg,
            value: value
        };
    }
}));

//passport config
require('./config/passport')(passport);
app.use(passport.initialize());
app.use(passport.session());

//for all routes
app.get('*', function(req, res, next){
    res.locals.user = req.user || null;
    next();
});



//home route
app.get('/', function(req, res){
    // res.render('index', {
    //     title: "Posts"
    // });
    res.render("index.ejs")
});

app.get('/must_login', function(req, res){
    res.render("must_login.ejs")
})

let posts = require("./routes/posts");
//anything with /posts will use the /routes/posts file
app.use('/posts', posts)

let users = require("./routes/users");
app.use('/users', users);


//start server
app.listen(3000, function(){
    console.log('Server started on port 3000')
});
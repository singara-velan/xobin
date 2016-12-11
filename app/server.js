// set up ========================
var express = require('express');
var app = express(); // create our app w/ express
var mongoose = require('mongoose'); // mongoose for mongodb
var morgan = require('morgan'); // log requests to the console (express4)
var bodyParser = require('body-parser'); // pull information from HTML POST (express4)
var dumpRoutes = require('./app/routes/data-dump-routes');

var port = process.env.PORT || 3000;

// configuration =================
// load the config and connect to MongoDB database
var database = require('./config/database')
mongoose.connect(database.url);
var db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function () {
    // we're connected!
    console.log("Successfully connected to the database!");
});

app.use(express.static(__dirname + '/public')); // set the static files location /public/img will be /img for users
app.use(morgan('dev')); // log every request to the console
app.use(bodyParser.urlencoded({'extended':'true'})); // parse application/x-www-form-urlencoded
app.use(bodyParser.json()); // parse application/json

// load the routes
app.use('/api/dump',dumpRoutes);

// listen (start app with node server.js) ======================================
app.listen(port, function (){
    console.log("App listening on port " + port);
});

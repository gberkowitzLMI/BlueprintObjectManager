var express = require('express');
var app = express();
var server = require('http').Server(app);
var bodyParser = require('body-parser');
var mongoose = require('mongoose');
var io = require('socket.io')(server);
var config = require('./config.js');
var mqttClient = require('./mqtt.js');
var passport = require('passport');
var expressSession = require('express-session');


app.use(bodyParser.json());
app.set('port', (process.env.PORT || 5000));
server.listen(app.get('port'));

var mongooseURI = process.env.MONGOLAB_URI || 'mongodb://' + config.db.host + ':' + config.db.port + '/' + config.db.database
mongoose.connect(mongooseURI);

//Register application models
require('./schema.js');

//Authentication with Passport
//http://code.tutsplus.com/tutorials/authenticating-nodejs-applications-with-passport--cms-21619
app.use(expressSession({secret: config.sessionSecret}));
app.use(passport.initialize());
app.use(passport.session());
passport.serializeUser(function(user, done) {
  done(null, user._id);
});
passport.deserializeUser(function(id, done) {
  User.findById(id, function(err, user) {
    done(err, user);
  });
});

mqttClient.connectMQTT();

app.use(express.static(__dirname + '/public'));

//add api routes first

//all other routes should default to angular router
app.get('/', function (req, res) {
  res.sendFile(__dirname + '/public/app/index.html');
});



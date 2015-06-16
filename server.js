var express = require('express');
var app = express();
var server = require('http').Server(app);
var bodyParser = require('body-parser');
var passport = require('passport');
var TokenStrategy = require('passport-token-auth')
var mongoose = require('mongoose');
var io = require('socket.io')(server);
var request = require('request');
var config = require('./config.js');
var mqttClient = require('./mqtt.js');
var auth = require('./auth.js');
var blueprint = require('./api/blueprint');

var manage = null;

app.use(bodyParser.json());
app.set('port', (process.env.PORT || 5000));
server.listen(app.get('port'));
app.use(passport.initialize());

var mongooseURI = process.env.MONGOLAB_URI || 'mongodb://' + config.db.host + ':' + config.db.port + '/' + config.db.database
mongoose.connect(mongooseURI);
mqttClient.connectMQTT();

app.use(express.static(__dirname + '/public'));


//Throw 404 when trying to access assets or api routes
app.route('/:url(api|auth|components|app|bower_components|assets)/*', function(req,res){
    res.sendStatus(404);
});


//add api routes first
app.post('/api/login', auth.doLogin, function(req,res) {
    res.end();
});

app.use('/blueprint', blueprint);

//all other routes should default to angular router
app.get('/', function (req, res) {
  res.sendFile(__dirname + '/public/app/index.html');
});
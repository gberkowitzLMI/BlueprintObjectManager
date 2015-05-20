var express = require('express');
var app = express();
var server = require('http').Server(app);
var bodyParser = require('body-parser');
var mongoose = require('mongoose');
var io = require('socket.io')(server);
var config = require('./config.js');
var mqttClient = require('./mqtt.js');

app.use(bodyParser.json());
app.set('port', (process.env.PORT || 5000));

server.listen(app.get('port'));
var mongooseURI = process.env.MONGOLAB_URI || 'mongodb://' + config.db.host + ':' + config.db.port + '/' + config.db.database
mongoose.connect(mongooseURI);

require('./schema.js');

mqttClient.connectMQTT();

app.use(express.static(__dirname + '/public'));

//add api routes first

//all other routes should default to angular router
app.get('/', function (req, res) {
  res.sendFile(__dirname + '/public/app/index.html');
});



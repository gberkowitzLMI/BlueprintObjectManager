var config = {}

config.db = {};
config.mqtt = {};
config.game = {}


config.db.host = process.env.DB_HOST || 'localhost';
config.db.port = process.env.DB_PORT || 27017;
config.db.database = process.env.DB_NAME || 'DEMO';

config.mqtt.host = process.env.MQTT_HOST || 'broker.xively.com';
config.mqtt.port = process.env.MQTT_PORT || 1883;
config.mqtt.username = process.env.MQTT_USERNAME || '5409abb5-c12c-4e49-acf0-359b8a758596';
config.mqtt.password = process.env.MQTT_PASSWORD || 'KB4oLIlPLKE3rzVFi7FWeA==';
config.mqtt.topic = process.env.MQTT_TOPIC || 'xi/blue/v1/9860a5f8-3b12-4086-963c-2830ce434835/d/8f78aac2-5a26-460b-ac9e-bd6f6e04bdc4/buzzer';

config.sessionSecret = "d7d063d2-c773-4fdb-8da8-7426a2492aa4";

module.exports = config;
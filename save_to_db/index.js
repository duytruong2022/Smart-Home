require('dotenv').config();

const mongoose = require('mongoose');
const Sensor = require('./models/Sensor');

const mqtt = require('mqtt')

const options = {
    host: 'broker.mqttdashboard.com',
    port: 1883,
    protocol: 'mqtt',
    // username: 'NgoaLong',
    // password: 'Ngoalong1910'
}

//initialize the MQTT client
const client = mqtt.connect(options);

//setup the callbacks
client.on('connect', function () {
    console.log('Connected');
    client.subscribe('demo', function (err) {
        if (!err) {
			console.log('Subcribing to MQTT Broker!');
		}
	});
    client.subscribe('test', function (err) {
        if (!err) {
			console.log('Subcribing to MQTT Broker!');
		}
	});
});

client.on('error', function (error) {
    console.log(error);
});

//Connect to mongodb database
mongoose.connect('mongodb://localhost/My_database', {
	useUnifiedTopology: true,
	useNewUrlParser: true,
});
const db = mongoose.connection;

db.once('open', () => {
	console.log('Connected to Database');
	client.on('message', async function (topic, message) {
		// message is Buffer
		let content = JSON.parse(message.toString());
		console.log(content);

		//Save to db
		//Create a new Sensor
		const sensor = new Sensor({
			humidityAir: content.humidityAir,
			temperature: content.temperature,
		});
		try {
			const savedSensor = await sensor.save();
			console.log('[Saved DB] =>',savedSensor);
		} catch (err) {
			console.error(err);
		}
	});
});

// // Test
// setInterval(() => {
//     data = JSON.stringify({
//         humidityAir: Math.floor(Math.random() * 100),
//         temperature: Math.floor(Math.random() * 100),
//     })
//     console.log(data);
// 	client.publish(
// 		'test',
// 		data,
// 	);
// }, 2000);
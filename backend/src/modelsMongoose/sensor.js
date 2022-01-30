const mongosse = require('mongoose');

const { Schema } = mongosse;

const Sensor = new Schema(
    {
        humidityAir: {
            type: Number,
            required: true,
        },
        temperature: {
            type: Number,
            required: true,
        },
        roomId: {
            type: Number,
            required: true,
        },
        createdDate: {
            type: Date,
            default: Date.now,
        },
        modifiedDate: {
            type: Date,
            default: Date.now,
        },
    },
    { timestamps: true },
);

module.exports = mongosse.model('Sensor', Sensor);

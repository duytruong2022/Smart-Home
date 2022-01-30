import { authenticate } from '../../middleware/auth';
import { getList } from './sensorController';
import { getSensorValidator } from './sensorValidator';

const express = require('express');

module.exports = (app) => {
    const router = express.Router();
    router.get('/', getSensorValidator, getList);
    app.use('/api/sensor', router);
};

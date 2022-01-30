const authApiRouter = require('../components/auth');
const userApiRouter = require('../components/users');
const sensorApiRouter = require('../components/sensor');

const routerManager = (app) => {
    authApiRouter(app);
    userApiRouter(app);
    sensorApiRouter(app);
};

module.exports = routerManager;

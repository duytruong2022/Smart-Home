#!/usr/bin/env node
/* eslint-disable no-console */

/**
 * Module dependencies.
 */

const debug = require('debug')('training-backend:server');
const http = require('http');
const mongooose = require('mongoose');
const app = require('./app');

/**
 * Get port from environment and store in Express.
 */

const port = parseInt(process.env.PORT || '3000', 10);
app.set('port', port);

mongooose.connect('mongodb://localhost/My_database', {
    useUnifiedTopology: true,
    useNewUrlParser: true,
});
const database = mongooose.connection;
database.on('error', (error) => console.error(error));
database.once('open', () => console.log('Connected to Database'));

/**
 * Create HTTP server.
 */

const server = http.createServer(app);

/**
 * Listen on provided port, on all network interfaces.
 */

server.listen(port, () => {
    console.log('server listening on port: ', port);
});

/**
 * Event listener for HTTP server "error" event.
 */

function onError(error) {
    if (error.syscall !== 'listen') {
        throw error;
    }

    const bind = typeof port === 'string' ? `Pipe ${port}` : `Port ${port}`;

    // handle specific listen errors with friendly messages
    switch (error.code) {
    case 'EACCES':
        console.error(`${bind} requires elevated privileges`);
        process.exit(1);
        break;
    case 'EADDRINUSE':
        console.error(`${bind} is already in use`);
        process.exit(1);
        break;
    default:
        throw error;
    }
}

/**
 * Event listener for HTTP server "listening" event.
 */

function onListening() {
    const addr = server.address();
    const bind = typeof addr === 'string' ? `pipe ${addr}` : `port ${addr.port}`;
    debug(`Listening on ${bind}`);
}

server.on('error', onError);
server.on('listening', onListening);

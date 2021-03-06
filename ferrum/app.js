const bodyparser = require('body-parser');
const Promise = require('promise');
const express = require('express');
const path = require('path');

const routeStudent = require('./route/student');
const routeTask = require('./route/task');
const routeJob = require('./route/job');
const errorHandler = require('./ErrorHandler');
const Ferrum = require('./Ferrum');

module.exports = (app) =>
{
    Ferrum.logger.info('Initializing app');

    app.use(express.static(path.join(__dirname, 'public')));
    app.use(bodyparser.json());
    app.use(bodyparser.urlencoded({ extended: true }));

    app.use('/api/student', routeStudent);
    app.use('/api/task', routeTask);
    app.use('/api/job', routeJob);
    app.use(errorHandler);
}

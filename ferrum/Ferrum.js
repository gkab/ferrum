let Ferrum = {
    languageController: null,
    studentStorage: null,
    taskManager: null,
    jobQueue: null,
    github: null,
    logger: null
};

module.exports = Ferrum;

Ferrum.github = new (require('github'))({});
Ferrum.studentStorage = new (require('./StudentStorage'))();
Ferrum.taskManager = new (require('./TaskManager'))();
Ferrum.jobQueue = new (require('./JobQueue'))();
Ferrum.languageController = new (require('./LanguageController'))();

const winston = require('winston');

winston.level = 'debug';
Ferrum.logger = winston;

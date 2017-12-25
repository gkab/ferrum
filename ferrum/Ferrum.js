const config = require('../config/config');
const fs = require('fs-extra');

let Ferrum = {
    languageController: null,
    studentStorage: null,
    taskManager: null,
    jobQueue: null,
    github: null,
    logger: null
};

module.exports = Ferrum;

Ferrum.github = new (require('github'))({
    headers: {
        'user-agent': 'ferrum-education'
    }
});

Ferrum.studentStorage = new (require('./StudentStorage'))();
Ferrum.taskManager = new (require('./TaskManager'))();
Ferrum.jobQueue = new (require('./JobQueue'))();
Ferrum.languageController = new (require('./LanguageController'))();

const winston = require('winston');

winston.level = 'debug';
Ferrum.logger = winston;

if (fs.existsSync('data/auth.json'))
{
    Ferrum.logger.info('Logging in to GitHub');
    Ferrum.github.authenticate({
        type: 'basic',
        username: config.githubRepoOwner,
        password: fs.readJsonSync('data/auth.json').token
    });
}

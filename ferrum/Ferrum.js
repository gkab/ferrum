let Ferrum = {
    languageController: null,
    studentStorage: null,
    jobQueue: null,
    github: null
};

module.exports = Ferrum;

Ferrum.github = new (require('github'))({});
Ferrum.studentStorage = new (require('./StudentStorage'))();
Ferrum.jobQueue = new (require('./JobQueue'))();
Ferrum.languageController = new (require('./LanguageController'))();

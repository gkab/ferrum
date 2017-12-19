let Ferrum = {
    languageController: null,
    solutionManager: null,
    github: null
};

module.exports = Ferrum;

Ferrum.github = new (require('github'))({});

Ferrum.languageController = new (require('./LanguageController'))();
Ferrum.solutionManager = new (require('./SolutionManager'))();

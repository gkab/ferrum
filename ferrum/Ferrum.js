let Ferrum = {
    languageController: null,
    solutionManager: null
};

module.exports = Ferrum;

Ferrum.languageController = new (require('./LanguageController'))();
Ferrum.solutionManager = new (require('./SolutionManager'))();

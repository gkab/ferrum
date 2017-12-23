let Ferrum = {
    languageController: null,
    github: null
};

module.exports = Ferrum;

Ferrum.github = new (require('github'))({});

Ferrum.languageController = new (require('./LanguageController'))();

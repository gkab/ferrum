const config = require('../config/languages');

class LanguageController
{
    constructor()
    {
        this.languages = {};

        this.loadLanguageImplementations();
    }

    languageExists(language)
    {
        return this.languages.hasOwnProperty(language);
    }

    // Can throw
    loadLanguageImplementation(language)
    {
        // Can throw
        const implementation = require('languages/' + language);
        // Can throw
        this.languages[language] = implementation;
    }
    // Can throw
    loadLanguageImplementations()
    {
        for (let lang in config)
        {
            // Can throw
            this.loadLanguageImplementation(lang);
        }
    }
    // Can throw
    createSolutionContext(language, options)
    {
        if (!this.languageExists(language))
            throw new Error(`Unknown language: ${language}`);
        return this.languages[language](config[language], options)
    }
}

module.exports = LanguageController;

const config = require('../config/languages');

class LanguageController
{
    constructor()
    {
        this.languages = {};

        loadLanguageImplementations();
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
            loadLanguageImplementation(lang);
        }
    }
    // Can throw
    createSolutionContext(language, options)
    {
        return this.languages[language](config[language])
    }
}

module.exports = LanguageController;

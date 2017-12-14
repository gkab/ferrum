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
        const implementation = require('../languages/LanguageContext' + language);
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
    createSolutionContext(language, cwd, options)
    {
        if (!this.languageExists(language))
            throw new Error(`Unknown language: ${language}`);
        return new this.languages[language](cwd, config[language], options)
    }
}

module.exports = LanguageController;

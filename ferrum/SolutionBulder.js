const Ferrum = require('./Ferrum');

class SolutionBuilder
{
    // Can throw
    constructor(path, config)
    {
        this.path = path;
        this.config = config;

        if (!Ferrum.languageController.languageExists(this.config.language))
        {
            throw new Error(`Language "${config.language}" is not supported`);
        }
    }
    // Can throw
    build()
    {
        // Can throw
        let context = Ferrum.languageController.createSolutionContext(this.config.language, this.path, this.config.options);

        context.compile()
        context.link();
    }
}

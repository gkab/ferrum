const Ferrum = require('./Ferrum');

class SolutionBuilder
{
    constructor(path, config)
    {
        this.path = path;
        this.config = config;

        if (!Ferrum.languageController.languageExists(this.config.language))
        {
            throw new Error(`Language "${config.language}" is not supported`);
        }
    }

    build()
    {
        let context = Ferrum.languageController.createSolutionContext(this.config.language, this.config.options);
        context.assertConfigSane(this.config.options);

        context.compile()
        context.link();
    }
}

const Ferrum = require('./Ferrum');

class SolutionBuilder
{
    // Can throw
    constructor(path, config)
    {
        this.path = path;
        this.config = config;

        if (!Ferrum.languageController.languageExists(this.config.lang))
        {
            throw new Error(`Language "${config.lang}" is not supported`);
        }
    }
    // Can throw
    async build()
    {
        // Every function here can throw
        let context = null;
        try
        {
            context = Ferrum.languageController.createSolutionContext(this.config.lang, this.path);
            context.applyBuildOptions(this.config);
            await context.compile()
            await context.link();
            context.cleanup();
        }
        catch (error)
        {
            if (context)
                context.cleanup();
            throw error;
        }
    }
}

module.exports = SolutionBuilder;

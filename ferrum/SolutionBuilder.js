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

        this.context = null;
    }
    // Can throw
    async build(streamStdout, streamStderr)
    {
        // Every function here can throw
        let context = null;
        try
        {
            context = Ferrum.languageController.createSolutionContext(this.config.lang, this.path);
            context.applyBuildOptions(this.config, streamStdout, streamStderr);
            await context.compile()
            await context.link();
        }
        catch (error)
        {
            throw error;
        }
    }
    cleanup()
    {
        if (this.context)
            this.context.cleanup();
    }
}

module.exports = SolutionBuilder;

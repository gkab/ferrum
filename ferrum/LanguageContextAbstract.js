const { AbstractMethodCall } = require('./Builtin');

class LanguageContextAbstract
{
    constructor(name, cwd, config)
    {
        this.name = name;
        this.cwd = cwd;
        this.config = config;
    }
    cleanup()
    {
        AbstractMethodCall();
    }
    getStatus()
    {
        AbstractMethodCall();
    }
    // Throws if options are malformed
    applyBuildOptions(config)
    {
        AbstractMethodCall();
    }
    // Throws if compilation fails
    async compile()
    {
        AbstractMethodCall();
    }
    // Throws if linking fails
    async link()
    {
        AbstractMethodCall();
    }
}

module.exports = LanguageContextAbstract;

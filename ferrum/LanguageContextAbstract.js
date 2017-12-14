const { AbstractMethodCall } = require('./Builtin');

class LanguageContextAbstract
{
    constructor(name, cwd, config, options)
    {
        this.name = name;
        this.cwd = cwd;
        this.config = config;
        this.options = options;
    }

    cleanup()
    {
        AbstractMethodCall();
    }
    getStatus()
    {
        AbstractMethodCall();
    }
    // Make these methods async?
    // Throws if compilation fails
    compile()
    {
        AbstractMethodCall();
    }
    // Throws if linking fails
    link()
    {
        AbstractMethodCall();
    }
}

module.exports = LanguageContextAbstract;

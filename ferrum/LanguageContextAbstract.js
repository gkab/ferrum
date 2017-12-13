const { AbstractMethodCall } = require('./Builtin');

class LanguageContextAbstract
{
    constructor(name, config, options)
    {
        this.name = name;
        this.config = config;
        this.options = options;
    }

    // Throws if config is not usable (fields missing, etc)
    assertConfigSane()
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

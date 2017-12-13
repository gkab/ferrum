const LanguageContextAbstract = require('../ferrum/LanguageAbstract.js');
const { NotImplementedMethodCall } = require('../ferrum/Builtin');

class LanguageContextC extends LanguageContextAbstract
{
    constructor(config, options)
    {
        super('C', config, options);
    }

    getStatus()
    {
        NotImplementedMethodCall();
    }
    compile()
    {
        NotImplementedMethodCall();
    }
    link()
    {
        NotImplementedMethodCall();
    }
}

module.exports = LanguageC;

const { AbstractMethodCall } = require('./Builtin');

class JobAbstract
{
    constructor()
    {
        AbstractMethodCall();
    }
    setID(id)
    {
        this.id = id;
    }
    start()
    {
        AbstractMethodCall();
    }
    status()
    {
        AbstractMethodCall();
    }
}

module.exports = JobAbstract;

const { AbstractMethodCall } = require('./Builtin');

class QueuedTaskAbstract
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

module.exports = QueuedTask;

const { AbstractMethodCall } = require('./Builtin');
const Ferrum = require('./Ferrum');

class JobAbstract
{
    constructor()
    {
        this.id = 0;
        this.status = {
            state: 'init'
        };
    }
    enterState(state)
    {
        this.status.state = state;
    }
    setID(id)
    {
        this.id = id;
    }
    start()
    {
        AbstractMethodCall();
    }
    getStatus()
    {
        return this.status;
    }
    done()
    {
        Ferrum.jobQueue.onJobDone(this.id);
    }
}

module.exports = JobAbstract;

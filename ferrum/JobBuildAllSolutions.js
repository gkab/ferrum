const JobAbstract = require('./JobAbstract');

const { NotImplementedMethodCall } = require('./Builtin');

class JobBuildAllSolutions extends JobAbstract
{
    constructor(task)
    {
        NotImplementedMethodCall();
        this.task = task;
    }
    start()
    {

    }
    status()
    {
        return {};
    }
}

module.exports = JobBuildAllSolutions;

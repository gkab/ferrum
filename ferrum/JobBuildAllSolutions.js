const JobAbstract = require('./JobAbstract');
const Ferrum = require('./Ferrum');
const stream = require('memory-streams');

const { NotImplementedMethodCall } = require('./Builtin');

class JobBuildAllSolutions extends JobAbstract
{
    constructor(task)
    {
        super();
        this.task = task;

        this.status.students = {};

        this.solutionManager = null;
    }
    async runStudent(username)
    {
        const status = {
            stdout: '',
            stderr: ''
        };
        const outStream = new stream.WritableStream();
        const errStream = new stream.WritableStream();
        try
        {
            await this.solutionManager.processStudentSolution(username, outStream, errStream);
            status.success = true;
        }
        catch (error)
        {
            status.error = error.message;
            console.log(error);
        }

        status.stdout = outStream.toString();
        status.stderr = errStream.toString();

        this.status.students[username] = status;
    }
    async run()
    {
        this.solutionManager = await Ferrum.taskManager.getSolutionManager(this.task.id);

        for (let username in this.solutionManager.solutions)
        {
            this.status.current = username;
            await this.runStudent(username);
        }
    }
    start()
    {
        this.enterState('running');
        this.run().then(() => {
            this.enterState('done');
            this.done();
        }).catch((error) => {
            console.log('job uncaught error', error);
            this.enterState('error');
            this.status.error = error.message;
            this.done();
        });
    }
}

module.exports = JobBuildAllSolutions;

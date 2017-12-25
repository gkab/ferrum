const JobAbstract = require('./JobAbstract');
const Ferrum = require('./Ferrum');
const stream = require('memory-streams');

class JobBuildSolution extends JobAbstract
{
    constructor(task, username)
    {
        super();
        this.task = task;
        this.username = username;

        this.status.stdout = '';
        this.status.stderr = '';
    }
    async run()
    {
        let sman = await Ferrum.taskManager.getSolutionManager(this.task.id);

        try
        {
            const outStream = new stream.WritableStream();
            const errStream = new stream.WritableStream();

            await sman.processStudentSolution(this.username, outStream, errStream);

            status.stdout = outStream.toString();
            status.stderr = errStream.toString();
            status.success = true;
        }
        catch (error)
        {
            console.log('job error', error);
            this.enterState('error');
            this.status.error = error.message;
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

module.exports = JobBuildSolution;

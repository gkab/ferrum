const low = require('lowdb');
const FileSync = require('lowdb/adapters/FileSync');
const tassert = require('assert-types');

const AlreadyExistsError = require('./errors/AlreadyExistsError');
const NotFoundError = require('./errors/NotFoundError');
const BadRequestError = require('./errors/BadRequestError');

const Ferrum = require('./Ferrum');
const JobBuildAllSolutions = require('./JobBuildAllSolutions');
const JobBuildSolution = require('./JobBuildSolution');
const SolutionManager = require('./SolutionManager');

class TaskManager
{
    constructor()
    {
        let adapter = new FileSync('data/tasks.json');
        this.db = low(adapter);
        this.db.defaults({ tasks: [] }).write();
        this.solutionManagers = {};
    }
    async getSolutionManager(id)
    {
        let task = this.get(id);

        if (!this.solutionManagers[id])
        {
            this.solutionManagers[id] = new SolutionManager(id, task.repo);
            await this.solutionManagers[id].init();
            await this.solutionManagers[id].fetchSolutions();
        }

        return this.solutionManagers[id];
    }
    getAll()
    {
        return this.db.get('tasks').value();
    }
    get(id)
    {
        let task = this.db.get('tasks').find({ id: id }).value();

        if (!task)
            throw new NotFoundError();

        return task;
    }
    async update(id)
    {
        let task = this.get(id);

        if (!this.solutionManagers[id])
        {
            this.solutionManagers[id] = new SolutionManager(id, task.repo);
            await this.solutionManagers[id].init();
        }

        await this.solutionManagers[id].fetchSolutions();
    }
    create(id, options)
    {
        try
        {
            tassert.string(id);
            tassert.string(options.repo);
        }
        catch (error)
        {
            throw new BadRequestError();
        }

        if (this.db.get('tasks').find({ id: id }).value())
            throw new AlreadyExistsError(`Task ${id} already exists`);

        this.db.get('tasks').push({
            id: id,
            repo: options.repo
        }).write();
    }
    delete(id)
    {
        // Assert task existance
        this.get(id);

        this.db.get('tasks').remove((task) => {
            return task.id == id;
        }).write();
    }
    buildAll(id)
    {
        let task = this.get(id);

        let existingJobs = Ferrum.jobQueue.filter((job) => {
            if (job instanceof JobBuildAllSolutions)
            {
                if (job.task.id == id)
                    return true;
            }
            return false;
        });

        if (existingJobs.length)
        {
            return existingJobs[0];
        }
        else
        {
            let job = new JobBuildAllSolutions(task);
            return Ferrum.jobQueue.push(job);
        }
    }
    build(id, username)
    {
        let task = this.get(id);

        let existingJobs = Ferrum.jobQueue.filter((job) => {
            if (job instanceof JobBuildSolution)
            {
                if (job.task.id == id && job.username == username)
                    return true;
            }
            return false;
        });

        if (existingJobs.length)
        {
            return existingJobs[0].id;
        }
        else
        {
            let job = new JobBuildSolution(task, username);
            return Ferrum.jobQueue.push(job);
        }
    }
}

module.exports = TaskManager;

const SolutionBuilder = require('./SolutionBuilder');
const Solution = require('./Solution');

const { NotImplementedMethodCall } = require('./Builtin');
const { diffGenerate } = require('./DiffHelper');
const config = require('../config/config');
const { asyncSpawn } = require('./ProcessPromise');
const Ferrum = require('./Ferrum');

const AlreadyExistsError = require('./errors/AlreadyExistsError');
const NotFoundError = require('./errors/NotFoundError');
const BadRequestError = require('./errors/BadRequestError');

const fs = require('fs-extra');
const os = require('os');
const git = require('git-promise');
const path = require('path');

class SolutionManager
{
    constructor(taskID, repo)
    {
        this.taskID = '' + taskID;

        this.tmpdir = path.join(os.tmpdir(), 'ferrum-solutions', this.taskID);

        fs.emptyDirSync(this.tmpdir);

        this.repo = repo;
        this.solutions = {};
    }
    async init()
    {
        let status = await asyncSpawn('git', ['clone', `https://github.com/${config.githubRepoOwner}/${this.repo}`, this.tmpdir]);
        if (status != 0)
            throw new Error(`git exited with status ${status}`);
    }
    async fetchSolutions()
    {
        let prs = await Ferrum.github.pullRequests.getAll({
            owner: config.githubRepoOwner,
            repo: this.repo
        });

        let solutions = {};

        for (let i of prs.data)
        {
            if (!solutions[i.user.login] || solutions[i.user.login].number < i.number)
            {
                solutions[i.user.login] = {
                    number: i.number
                };
            }
        }
        this.solutions = solutions;

        return solutions;
    }
    async processStudentSolution(username, streamStdout, streamStderr)
    {
        if (!this.solutions[username])
            throw new NotFoundError(`No solution for ${username}`);

        const number = this.solutions[username].number;

        try
        {
            const solution = new Solution(this, number);
            await solution.fetchInformation();
            await solution.download();
            solution.checkDelta();
            solution.initSolutionBuilder();
            await solution.build(streamStdout, streamStderr);
        }
        catch (e)
        {
            // TODO handle error (output log, etc)
            throw e;
        }

        // Tries to build the solution
        // Deletes local clone of the student's repo
    }
    cleanup()
    {
        fs.removeSync(this.tmpdir);
    }
}

module.exports = SolutionManager;

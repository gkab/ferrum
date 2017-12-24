const SolutionBuilder = require('./SolutionBuilder');
const Solution = require('./Solution');

const { NotImplementedMethodCall } = require('./Builtin');
const { diffGenerate } = require('./DiffHelper');
const config = require('../config/config');
const { asyncSpawn } = require('./ProcessPromise');
const Ferrum = require('./Ferrum');

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
    }
    async init()
    {
        let status = await asyncSpawn('git', ['clone', `https://github.com/${config.githubRepoOwner}/${this.repo}`, this.tmpdir]);
        if (status != 0)
            throw new Error(`git exited with status ${status}`);
    }
    async fetchSolutions()
    {
        let prs = Ferrum.github.pullRequests.get();
    }
    async processStudentSolution(pullRequestID, streamStdout, streamStderr)
    {
        try
        {
            let solution = new Solution(this, pullRequestID);
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

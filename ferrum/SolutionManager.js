const SolutionBuilder = require('./SolutionBuilder');
const Solution = require('./Solution');

const { NotImplementedMethodCall } = require('./Builtin');
const { diffGenerate } = require('./DiffHelper');
const config = require('../config/config');

const fs = require('fs-extra');
const os = require('os');
const git = require('git-promise');
const path = require('path');

/*
    Right now everything is stored in /tmp folders
    That includes master repo and all downloaded student repos

    This can be optimized later by using `git checkout`, etc
*/

class SolutionManager
{
    constructor(taskID)
    {
        this.taskID = taskID;

        this.tmpdir = path.join(os.tmpdir(), 'ferrum-solutions', taskID);
        // Clean up
        try
        {
            fs.removeSync(this.tmpdir);
        }
        catch (error) {}

        fs.mkdirSync(this.tmpdir);
    }
    async processStudentSolution(pullRequestID, streamStdout, streamStderr)
    {
        try
        {
            let solution = new Solution(this, pullRequestID);
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

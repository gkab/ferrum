const SolutionBuilder = require('./SolutionBuilder');

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
    constructor()
    {
        this.tmpdir = path.join(os.tmpdir(), 'ferrum-git');
        // Clean up
        try
        {
            fs.removeSync(this.tmpdir);
        }
        catch (error) {}
        fs.mkdirSync(this.tmpdir);

        this.masterPath = path.join(this.tmpdir, 'master');
        this.studentPath = path.join(this.tmpdir, 'student');
        fs.mkdirSync(this.studentPath);
    }
    async setupMasterRepo(url)
    {
        let cwd = process.cwd();
        await git(`clone ${url} ${this.masterPath}`);
    }
    async processStudentSolution(username, reponame)
    {
        try
        {
            // Clones a repo from https://github.com/${username}/${reponame}
            let repo = path.join(this.studentPath, username);
            await git(`clone https://github.com/${username}/${reponame} ${repo}`);
            // Compares it with the master repo (only changed folder MUST be user's own folder)
            let diff = diffGenerate(this.masterPath, repo);
            if (diff.affectedRoot === '')
                throw new Error('Root directory must not be changed');
            // TODO check if folder belongs to user
            let solutionPath = path.join(repo, diff.affectedRoot);
            let config = fs.readJsonSync(path.join(solutionPath, 'build.json'));
            let sb = new SolutionBuilder(solutionPath, config);
            await sb.build();
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

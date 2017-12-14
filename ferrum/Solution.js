const SolutionBuilder = require('./SolutionBuilder');
const Ferrum = require('./Ferrum');

const { NotImplementedMethodCall } = require('./Builtin');
const { diffGenerate } = require('./DiffHelper');

const os = require('os');
const fs = require('fs-extra');
const git = require('git-promise');
const path = require('path');

class Solution
{
    // Can throw
    constructor(username, reponame)
    {
        this.path = path.join(Ferrum.solutionManager.studentPath, username);
        this.username = username;
        this.reponame = reponame;
        // Can throw (student is not registered)
        // this.studentDirectory = Ferrum.studentStorage.getStudent(username).workingDirectory;
        this.studentDirectory = 'FerrumStudent';
        this.solutionPath = path.join(this.path, this.studentDirectory);

        try
        {
            fs.removeSync(this.path);
        }
        catch (error) {}

        this.buildConfig = null;
        this.builder = null;
    }
    async download()
    {
        await git(`clone https://github.com/${this.username}/${this.reponame} ${this.path}`);
    }
    // Compares it with the master repo (only changed folder MUST be user's own folder)
    checkDelta()
    {
        let diff = diffGenerate(Ferrum.solutionManager.masterPath, this.path);
        if (diff.affectedRoot === '')
            throw new Error('Root directory must not be changed');
        /*
        let ownWD = ;
        if (diff.affectedRoot !== ownWD)
            throw new Error(`Root directory must belong to user (${ownWD})`);
        */
    }
    // Parse build.json and make sure it's valid, create builder
    // Can throw
    initSolutionBuilder()
    {
        this.buildConfig = fs.readJsonSync(path.join(this.solutionPath, 'build.json'));

        if (this.buildConfig['format-version'] != '2')
            throw new Error('Format version must be 2');

        this.builder = new SolutionBuilder(this.solutionPath, this.buildConfig);
    }
    // Can throw
    async build()
    {
        await this.builder.build();
    }
}

module.exports = Solution;

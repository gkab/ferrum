const SolutionBuilder = require('./SolutionBuilder');
const Ferrum = require('./Ferrum');
const config = require('../config/config.js')

const { NotImplementedMethodCall } = require('./Builtin');
const { diffGenerate } = require('./DiffHelper');

const os = require('os');
const fs = require('fs-extra');
const git = require('git-promise');
const path = require('path');
const Promise = require('promise');
const common_prefix = require('common-prefix');

class Solution
{
    // Can throw
    constructor(manager, pullRequestNumber)
    {
        this.manager = manager;
        this.pullRequestNumber = pullRequestNumber;

        this.username = username;
        this.reponame = reponame;
        // Can throw (student is not registered)
        // this.studentDirectory = Ferrum.studentStorage.getStudent(username).workingDirectory;
        this.studentDirectory = 'FerrumStudent';

        this.buildConfig = null;
        this.builder = null;
    }
    async fetchInformation()
    {
        this.pullRequest = await Ferrum.github.pullRequests.get({
            owner: config.githubRepoOwner,
            repo: this.manager.repo,
            number: this.pullRequestNumber
        });
        this.mergeCommit = await Ferrum.github.repos.getCommit({
            owner: config.githubRepoOwner,
            repo: this.manager.repo,
            sha: this.pullRequest.merge_commit_sha
        });
        this.info = {
            username: this.pullRequest.user.login,
            reponame: this.pullRequest.head.repo.name
        };
    }
    prepareBuildingDirectory()
    {
        this.path = path.join(this.manager.tmpdir, this.mergeCommit.sha.substr(12));
        if (fs.existsSync(this.path))
            fs.removeSync(this.path);
        fs.mkdirSync(this.path);
        this.solutionPath = path.join(this.path, this.studentDirectory);
    }
    // Returns a Promise
    /* async */ download()
    {
        return new Promise((resolve, reject) => {

        });
    }
    // Compares it with the master repo (only changed folder MUST be user's own folder)
    // Will throw if it's not true
    checkDelta()
    {
        for (let file of this.mergeCommit.files)
        {
            if (file.indexOf(this.studentDirectory + '/') !== 0)
                throw new Error(`You can't modify files outside ${this.studentDirectory}/`);
        }
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
    async build(streamStdout, streamStderr)
    {
        await this.builder.build(streamStdout, streamStderr);
    }
}

module.exports = Solution;

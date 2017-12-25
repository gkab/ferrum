const SolutionBuilder = require('./SolutionBuilder');
const Ferrum = require('./Ferrum');
const config = require('../config/config.js')

const { NotImplementedMethodCall } = require('./Builtin');
const { diffGenerate } = require('./DiffHelper');
const { asyncSpawn } = require('./ProcessPromise');

const os = require('os');
const fs = require('fs-extra');
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

        if (!this.pullRequest.data.merge_commit_sha)
            throw new Error(`no merge commit for pull request ${this.pullRequestNumber}`);

        this.mergeCommit = await Ferrum.github.repos.getCommit({
            owner: config.githubRepoOwner,
            repo: this.manager.repo,
            sha: this.pullRequest.data.merge_commit_sha
        });
        this.info = {
            username: this.pullRequest.data.user.login,
            reponame: this.pullRequest.data.head.repo.name
        };
        this.studentDirectory = Ferrum.studentStorage.get(this.info.username).workingDirectory;
        this.solutionPath = path.join(this.manager.tmpdir, this.studentDirectory);
    }
    // Returns a Promise
    async download()
    {
        let status = await asyncSpawn('git', ['fetch', 'origin', `pull/${this.pullRequestNumber}/merge:pr-${this.pullRequestNumber}`], {
            cwd: this.manager.tmpdir
        });

        if (status != 0)
            throw new Error(`Failed to fetch merge for pull request ${this.pullRequestNumber}`);

        status = await asyncSpawn('git', ['checkout', `pr-${this.pullRequestNumber}`], {
            cwd: this.manager.tmpdir
        });

        if (status != 0)
            throw new Error(`Failed to checkout merge for pull request ${this.pullRequestNumber}`);
    }
    // Compares it with the master repo (only changed folder MUST be user's own folder)
    // Will throw if it's not true
    checkDelta()
    {
        for (let file of this.mergeCommit.data.files)
        {
            if (file.filename.indexOf(this.studentDirectory + '/') !== 0)
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

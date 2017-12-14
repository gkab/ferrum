const SolutionBuilder = require('./SolutionBuilder');
const { NotImplementedMethodCall } = require('./Builtin');

class Solution
{
    constructor(repo)
    {
        NotImplementedMethodCall();

        this.path = '';
        this.buildConfig = {};
    }
    // Check that the fork only modifies a single folder
    checkDelta()
    {
        NotImplementedMethodCall();
    }
    // Download the repo
    pull()
    {
        NotImplementedMethodCall();
    }
    // Parse build.json and make sure it's valid
    check()
    {
        NotImplementedMethodCall();
    }
    // Build the solution
    // Can throw
    build()
    {
        let builder = new SolutionBuilder(this.path, this.buildConfig);
        builder.build();
    }
}

module.exports = Solution;

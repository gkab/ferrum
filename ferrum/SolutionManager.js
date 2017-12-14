const { NotImplementedMethodCall } = require('./Builtin');

/*
    Right now everything is stored in /tmp folders
    That includes master repo and all downloaded student repos

    This can be optimized later by using `git checkout`, etc
*/

class SolutionManager
{
    constructor()
    {
        NotImplementedMethodCall();
    }
    setupMasterRepo(url)
    {
        NotImplementedMethodCall();
    }
    async processStudentSolution(username)
    {
        NotImplementedMethodCall();

        // Clones a repo from https://github.com/{username}/{master_repo_name}
        // Compares it with the master repo (only changed folder MUST be user's own folder)
        // Tries to build the solution
        // Deletes local clone of the student's repo
    }
}

module.exports = SolutionManager;

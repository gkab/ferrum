/*
    Work in progress

    This file contains declarations of functions to be implemented, descriptions of APIs, etc
    ALL these declarations are to be moved into individual files!!!
*/

/*
    StudentStorage

    Manages data of students
    Backed by SQL database OR JSON file
*/
class StudentStorage
{
    constructor() {}
    // Store the fact that student submitted a pull request
    storePullRequest(username, commit) {}
    // Store solution result
    storeSolutionResult(success) {}
}

class Server
{
    constructor() {}
    // Request server to process a solution (fork)
    processSolution(url) {}
    // Return a list of solutions available
    listSolutions() {}
}

class Solution
{
    constructor(repo) {}
    // Check that the fork only modifies a single folder
    checkDelta() {}
    // Download the repo
    pull() {}
    // Parse build.json and make sure it's valid
    check() {}
    // Build the solution
    build() {}
}

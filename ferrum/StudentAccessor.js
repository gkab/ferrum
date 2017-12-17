const { NotImplementedMethodCall } = require('./Builtin');

class StudentAccessor
{
    constructor(studentStorage, username)
    {
        this.studentStorage = studentStorage;
        this.data = studentStorage.students.get('students').find({ username: username }).value();
        if (!this.data)
        {
            throw new Error(`Student ${username} does not exist`);
        }
    }
    // Stores the result of solution build (success/failure)
    storeSolutionBuildResult(result)
    {
        NotImplementedMethodCall();
    }
    // Stores the result of solution test (number of completed tests)
    storeSolutionTestResult(result)
    {
        NotImplementedMethodCall();
    }
}

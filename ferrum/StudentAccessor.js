const { NotImplementedMethodCall } = require('./Builtin');

class StudentAccessor
{
    constructor(studentStorage)
    {
        this.studentStorage = studentStorage;
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

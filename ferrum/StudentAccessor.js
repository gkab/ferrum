const { NotImplementedMethodCall } = require('./Builtin');

class StudentAccessor
{
    constructor(studentStorage, username)
    {
        this.studentStorage = studentStorage;
        if (!this.data())
        {
            throw new Error(`Student ${username} does not exist`);
        }
    }
    chain()
    {
        return this.studentStorage.db.get('students').find({ username: username });
    }
    data()
    {
        return this.chain().value();
    }
    set(property, value)
    {
        let change = {};
        change[property] = value;
        this.chain().assign(change).write();
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

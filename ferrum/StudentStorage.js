const { NotImplementedMethodCall } = require('./Builtin');

/*
    StudentStorage

    Manages data of students
    Backed by NeDB
*/
class StudentStorage
{
    constructor()
    {
        NotImplementedMethodCall();
    }
    // Loads database
    load()
    {
        NotImplementedMethodCall();
    }
    // Unloads database
    unload()
    {
        NotImplementedMethodCall();
    }
    // Returns a StudentAccessor
    getStudent(username)
    {
        NotImplementedMethodCall();
    }
}

module.exports = StudentStorage;

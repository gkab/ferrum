/*
    StudentStorage

    Manages data of students
    Backed by NeDB
*/
class StudentStorage
{
    constructor() {}
    // Loads database
    load() {}
    // Unloads database
    unload() {}
    // Returns a StudentAccessor
    getStudent(username) {}
}

module.exports = StudentStorage;

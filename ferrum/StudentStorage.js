const { NotImplementedMethodCall } = require('./Builtin');

const low = require('lowdb');
const FileSync = require('lowdb/adapters/FileSync');
const Promise = require('promise');

/*
    StudentStorage

    Manages data of students
*/
class StudentStorage
{
    constructor()
    {
        let adapter = new FileSync('data/students.json');
        this.students = low(adapter);
        this.students.defaults({ students: [] }).write();
     }
    createStudent(username, workingDirectory)
    {
        if (this.studentExists(username))
            throw new Error('Student already exists');
        this.students.get('students').push({
            username: username,
            workingDirectory: workingDirectory
        }).write();
    }
    studentExists(username)
    {
        return this.students.get('students').find({ username: username }).value();
    }
    // Returns a StudentAccessor
    getStudent(username)
    {
        // TODO
        return new StudentAccessor(this, username);
    }
}

module.exports = StudentStorage;

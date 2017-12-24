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
        this.db = low(adapter);
        this.db.defaults({ students: [] }).write();
     }
    createStudent(username, workingDirectory)
    {
        this.db.get('students').push({
            username: username,
            workingDirectory: workingDirectory
        }).write();
        console.log('created student', username);
    }
    deleteStudent(username)
    {
        this.db.get('students').remove((student) => {
            return student.username == username;
        }).write();
        console.log('deleted student', username);
    }
    studentExists(username)
    {
        return this.db.get('students').find({ username: username }).value();
    }
    // Returns a StudentAccessor
    getStudent(username)
    {
        try
        {
            return new StudentAccessor(this, username);
        }
        catch (e)
        {
            return null;
        }
    }
}

module.exports = StudentStorage;

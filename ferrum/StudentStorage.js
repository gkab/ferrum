const { NotImplementedMethodCall } = require('./Builtin');

const low = require('lowdb');
const FileSync = require('lowdb/adapters/FileSync');
const Promise = require('promise');

const BadRequestError = require('./errors/BadRequestError');
const NotFoundError = require('./errors/NotFoundError');
const AlreadyExistsError = require('./errors/AlreadyExistsError');

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
    getAll()
    {
        let students = this.db.get('students').value();
        return students;
    }
    get(username)
    {
        let student = this.db.get('students').find({ username: username }).value()
        if (!student)
            throw new NotFoundError(`Student ${username} does not exist`);
        return student;
    }
    create(username, options)
    {
        try
        {
            tassert.string(username);
            tassert.string(options.workingDirectory);
        }
        catch (error)
        {
            throw new BadRequestError();
        }

        if (this.db.get('students').find({ username: username }).value())
            throw new AlreadyExistsError(`Student ${username} already exists`);

        this.db.get('students').push({
            username: username,
            workingDirectory: options.workingDirectory
        }).write();

        console.log('created student', username);
    }
    delete(username)
    {
        this.get(username);

        this.db.get('students').remove((student) => {
            return student.username == username;
        }).write();

        console.log('deleted student', username);
    }
    studentExists(username)
    {
        return this.db.get('students').find({ username: username }).value();
    }
}

module.exports = StudentStorage;

const { NotImplementedMethodCall } = require('./Builtin');

const Datastore = require('nedb');
const Promise = require('promise');

/*
    StudentStorage

    Manages data of students
    Backed by NeDB
*/
class StudentStorage
{
    constructor()
    {
        this.students = new Datastore({ filename: 'data/students.db', autoload: true });
        this.students.ensureIndex({ fieldName: 'username', unique: true })
    }
    async createStudent(username)
    {
        
    }
    async studentExists(username)
    {
        return new Promise((resolve, reject) => {
            this.students.find({ username: username }, (err, docs) => {
                if (err)
                    reject(err);
                else
                    resolve(docs.length);
            })
        });
    }
    // Returns a StudentAccessor
    async getStudent(username)
    {
        // TODO
        return new StudentAccessor()
    }
}

module.exports = StudentStorage;

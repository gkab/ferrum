const bodyparser = require('body-parser');
const Promise = require('promise');
const path = require('path');

/*

HTTP API

POST    student/{name} - adds a student
    workingDirectory: string
DELETE  student/{name} - deletes a student
GET     student/{name}/{field} - returns student data
    field: workingDirectory
PUT     student/{name}/{field} - updates student data
    field: workingDirectory

GET     student/{name}/build - builds student project, returns result and stdout/stderr

GET     student/list - returns array of all registered students
GET     task/list - returns array of all stored tasks

POST task/{taskid} - creates a new task with ID
    repository: URL of task main repo
GET  task/{taskid}/build/all - downloads and builds every solution
    returns JSON object in format:
    {
        "username": {
            "success": true
        },
        "username2": {
            "success": false,
            "reason":
                one of the following:
                    "git" - git error, student didn't fork the repo, etc
                        "details" is set to null
                    "fork" - student fork changes something outside of their working directory
                        "details" is set to array of changed files
                    "config" - solution build.json is invalid
                        "details" is set to null
                    "build" - solution building failed
                        "details" is set to object, containing two strings with keys "stdout" and "stderr"
                    "link" - solution linking failed
                        "details" is same as in "build"
                    "other" - exception has occured
                        "details" is set to JSON.stringify() of exception object
            "details":
                depends on reason
        }
    }
GET  task/{taskid}/build/{student} - downlods and builds a single solution
    returns JSON object similar to "username2" from /all

*/

const wrapAsyncMethod = fn =>
    (req, res, next) =>
        Promise.resolve(fn(req, res, next)).catch(next);

module.exports = (app) =>
{
    app.use(express.static(path.join(__dirname, 'public')));
    app.use(bodyparser.json());
    app.use(bodyparser.urlencoded({ extended: true }));

    app.post('/api/student/:name', wrapAsyncMethod(async (req, res, next) => {
        Ferrum.studentStorage.createStudent(req.params.name, req.body.workingDirectory);
        res.status(200).end();
    }));
    app.delete('/api/student/:name', wrapAsyncMethod(async (req, res, next) => {
        Ferrum.studentStorage.deleteStudent(req.params.name);
        res.status(200).end();
    }));
    app.get('/api/student/:name/:field', wrapAsyncMethod(async (req, res, next) => {
        let accessor = await Ferrum.studentStorage.getStudent(req.params.name);

    }));
    app.put('/api/student/:name/:field/:value', wrapAsyncMethod(async (req, res, next) => {
        let accessor = await Ferrum.studentStorage.getStudent(req.params.name);
        accessor.set(req.params.field, req.params.value);
        res.status(200).end();
    }));
    app.get('/api/student/:name/build', wrapAsyncMethod(async (req, res, next) => {

    }));
}

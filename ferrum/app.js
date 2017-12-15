const bodyparser = require('body-parser');
const Promise = require('promise');
const path = require('path');

/*

API

TODO auth

POST    student/{name} - adds a student
    workingDirectory: string
DELETE  student/{name} - deletes a student
GET     student/{name}/{field} - returns student data
    field: workingDirectory
PUT     student/{name}/{field} - updates student data
    field: workingDirectory

GET     student/{name}/build - builds student project, returns result and stdout/stderr

*/

const wrapAsyncMethod = fn =>
    (req, res, next) =>
        Promise.resolve(fn(req, res, next)).catch(next);

module.exports = (app) =>
{
    app.use(express.static(path.join(__dirname, 'public')));
    app.use(bodyparser.json());
    app.use(bodyparser.urlencoded({ extended: true }));

    app.post('/student/:name', wrapAsyncMethod(async (req, res, next) => {
        Ferrum.studentStorage.createStudent(req.params.name, req.body.workingDirectory);
        res.status(200).end();
    }));
    app.delete('/student/:name', wrapAsyncMethod(async (req, res, next) => {
        Ferrum.studentStorage.deleteStudent(req.params.name);
        res.status(200).end();
    }));
    app.get('/student/:name/:field', wrapAsyncMethod(async (req, res, next) => {
        let accessor = await Ferrum.studentStorage.getStudent(req.params.name);

    }));
    app.put('/student/:name/:field/:value', wrapAsyncMethod(async (req, res, next) => {
        let accessor = await Ferrum.studentStorage.getStudent(req.params.name);
        accessor.set(req.params.field, req.params.value);
        res.status(200).end();
    }));
    app.get('/student/:name/build', wrapAsyncMethod(async (req, res, next) => {
        
    }));
}

const bodyparser = require('body-parser');
const Promise = require('promise');
const path = require('path');

/*

API

TODO auth

POST    student/{name} - adds a student
    username: string
    workingDirectory: string
DELETE  student/{name} - deletes a student
GET     student/{name}/{field} - returns student data
    field: username, workingDirectory
PUT     student/{name}/{field} - updates student data
    field: username, workingDirectory

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

    }));
    app.delete('/student/:name', wrapAsyncMethod(async (req, res, next) => {

    }));
    app.get('/student/:name/:field', wrapAsyncMethod(async (req, res, next) => {

    }));
    app.put('/student/:name/:field', wrapAsyncMethod(async (req, res, next) => {

    }));
    app.get('/student/:name/build', wrapAsyncMethod(async (req, res, next) => {

    }));
}

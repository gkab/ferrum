/*

GET     / - returns array of all registered students
POST    /{name} - adds a student
    workingDirectory: string
DELETE  /{name} - deletes a student
GET     /{name}/{field} - returns student data
    field: workingDirectory
PUT     /{name}/{field} - updates student data
    field: workingDirectory

*/

const router = require('express').Router();
const wrap = require('async-middleware').wrap;

router.get('/', null);
router.get('/:name', null);
router.delete('/:name', null);
router.get('/:name/:field', null);
router.put('/:name/:field', null);

module.exports = router;

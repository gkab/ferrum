/*

GET     / - returns array of all registered students
GET     /:name - returns info about a student

POST    /:name - creates a student
    workingDirectory: string

DELETE  /:name - deletes a student
GET     /:name/:property - returns student data
    property: workingDirectory
PUT     /:name/:property - updates student data
    property: workingDirectory

*/

const router = require('express').Router();
const wrap = require('async-middleware').wrap;
const Ferrum = require('../Ferrum');

router.get('/', (req, res) => {
    res.status(200).end();
});
router.get('/:name', (req, res) => {
    try
    {
        let data = Ferrum.studentStorage.getStudent(req.params.name).data();
        res.status(200).json(data).end();
    }
    catch (e)
    {
        res.status(404).end();
    }
});
router.post('/:name', (req, res) => {
    try
    {
        Ferrum.studentStorage.createStudent(req.params.name, req.body.workingDirectory);
        res.status(200).end();
    }
    catch (e)
    {
        res.status(409).end();
    }
});
router.delete('/:name', (req, res) => {
    try
    {
        Ferrum.studentStorage.deleteStudent(req.params.name);
        res.status(200).end();
    }
    catch (e)
    {
        res.status(404).end();
    }
});
router.get('/:name/:property', (req, res) => {
    let student = Ferrum.studentStorage.getStudent(req.params.name);
    if (!student)
    {
        res.status(404).end();
    }
    else
    {
        let data = student.data();
        if (!data)
        {
            res.status(500).end();
        }
        else
        {
            res.status(200).json(data).end();
        }
    }
});
router.put('/:name/:property', (req, res) => {
    let student = Ferrum.studentStorage.getStudent(req.params.name);
    if (!student)
    {
        res.status(404).end();
    }
    else
    {
        student.set(req.params.property, req.body);
    }
});

module.exports = router;

/*


GET / - returns array of all stored tasks

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

const router = require('express').Router();
const wrap = require('async-middleware').wrap;

router.get('/', null);
router.get('/:id', null);
router.delete('/:id', null);
router.get('/:id/:field', null);
router.put('/:id/:field', null);

router.put('/:id/build', null);
router.put('/:id/build/:student', null);

module.exports = router;

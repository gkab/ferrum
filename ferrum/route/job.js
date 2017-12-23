/*

GET     / - returns status of job queue and status of current job
GET     /:job - returns status for a job
PUT     /:job/cancel - cancels a job

*/

const router = require('express').Router();
const wrap = require('async-middleware').wrap;

router.get('/', null);
router.get('/:job', null);
router.put('/:job/cancel', null);

module.exports = router;

/*

GET     / - returns status of job queue and status of current job
GET     /:job - returns status for a job
PUT     /:job/cancel - cancels a job

*/

const router = require('express').Router();
const wrap = require('async-middleware').wrap;
const Ferrum = require('../Ferrum');

router.get('/', (req, res) => {
    res.status(200).json(Ferrum.jobQueue.status()).end();
});
router.get('/:job', (req, res) => {
    res.status(200).json(Ferrum.jobQueue.jobStatus(req.params.job)).end();
});
router.put('/:job/cancel', (req, res) => {
    Ferrum.jobQueue.cancel(req.params.job);
    res.status(200).end();
});

module.exports = router;

/*

GET     / - returns status of job queue and status of current job
GET     /:job - returns status for a job
PUT     /:job/cancel - cancels a job

*/

const router = require('express').Router();
const wrap = require('async-middleware').wrap;
const Ferrum = require('../Ferrum');

router.get('/', (req, res) => {
    let status = Ferrum.jobQueue.status();
    res.status(200).json(status).end();
});
router.get('/:job', (req, res) => {
    let status = Ferrum.jobQueue.jobStatus(req.params.job);

    if (status)
        res.status(200).json(status).end();
    else
        res.status(404).end();
});
router.put('/:job/cancel', (req, res) => {
    try
    {
        Ferrum.jobQueue.cancel(req.params.job);
        res.status(200).end();
    }
    catch (e)
    {
        res.status(500).end(e.message);
    }
});

module.exports = router;

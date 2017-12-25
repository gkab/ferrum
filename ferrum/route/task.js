const router = require('express').Router();
const wrap = require('async-middleware').wrap;

const Ferrum = require('../Ferrum');
const FerrumError = require('../errors/FerrumError');

router.get('/', (req, res) => {
    res.status(200).json(Ferrum.taskManager.getAll()).end();
});
router.get('/:id', (req, res) => {
    res.status(200).json(Ferrum.taskManager.get(req.params.id)).end();
});
router.post('/:id', (req, res) => {
    Ferrum.taskManager.create(req.params.id, req.body);
    res.status(201).end();
});
router.delete('/:id', (req, res) => {
    Ferrum.taskManager.delete(req.params.id);
    res.status(200).end();
});
router.put('/:id', (req, res) => {
    // TODO update task data
});
router.put('/:id/build', (req, res) => {
    let job = Ferrum.taskManager.buildAll(req.params.id);
    res.status(202).json({
        job: job
    }).end();
});
router.put('/:id/build/:student', (req, res) => {
    let job = Ferrum.taskManager.build(req.params.id, req.params.student);
    res.status(202).json({
        job: job
    }).end();
});

module.exports = router;

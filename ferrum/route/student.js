const router = require('express').Router();
const wrap = require('async-middleware').wrap;
const Ferrum = require('../Ferrum');

router.get('/', (req, res) => {
    res.status(200).json(Ferrum.studentStorage.getAll()).end();
});
router.get('/:name', (req, res) => {
    res.status(200).json(Ferrum.studentStorage.get(req.params.name)).end();
});
router.post('/:name', (req, res) => {
    Ferrum.studentStorage.create(req.params.name, req.body);
    res.status(200).end();
});
router.delete('/:name', (req, res) => {
    Ferrum.studentStorage.delete(req.params.name);
    res.status(200).end();
});
router.put('/:name', (req, res) => {
    Ferrum.studentStorage.put(req.params.name, req.body);
    res.status(200).end();
});

module.exports = router;

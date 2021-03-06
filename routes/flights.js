var express = require('express');
var router = express.Router();
var flightsCtrl = require('../controllers/flights');

router.get('/', flightsCtrl.index);
router.get('/new', flightsCtrl.new);
router.get('/:id', flightsCtrl.show);

router.post('/', flightsCtrl.create);
router.post('/:id', flightsCtrl.createDest);
router.post('/:id/ticket', flightsCtrl.addTicket);

module.exports = router;

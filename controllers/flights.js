var Flight = require('../models/flight');

module.exports = {
	index,
	new: newFlight,
	create
}

function index(req, res) {
	console.log("controller index");
    Flight.find({}, function(err, flights) {
        res.render('flights', {title: 'All Flights', flights});
    });
}

function newFlight(req, res) {
	res.render('flights/new', {title: 'New Flights'})
}

function create(req, res) {
	for (let key in req.body) {
		if (req.body[key] === '') {
			delete req.body[key];
		}
	}
	console.log("DEBUGGING =================");
	console.log(req.body);
	console.log(" ================= DEBUGGING");
	let flight = new Flight(req.body);
	flight.save(function(err) {
		if (err) {
			return res.render('flights/new')
		}
		res.redirect('flights');
	})
}
var Flight = require('../models/flight');

module.exports = {
	index,
	new: newFlight,
	create,
	show,
	createDest
}

function index(req, res) {
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
	let flight = new Flight(req.body);
	flight.save(function(err) {
		if (err) {
			return res.render('flights/new')
		}
		res.redirect('flights');
	})
}

function show(req, res) {
	Flight.findById(req.params.id, function(err, flight) {
		res.render('flights/show', {title: 'Details', flight});
	});
}

function createDest(req, res) {
	let destination = req.body;
	Flight.findById(req.params.id, function(err, flight) {
		console.log("===");
		console.log(flight)
		console.log(destination);
		flight.destinations.push(destination);
		console.log("===");
		console.log(flight);
		console.log("===");
		flight.save(); //.then(result => console.log(result)).catch(error => console.log(error));
		res.render(`flights/show`, {title: 'Details', flight});
	});
}
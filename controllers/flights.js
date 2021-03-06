var Flight = require('../models/flight');
var Ticket = require('../models/ticket');

module.exports = {
	index,
	new: newFlight,
	create,
	show,
	createDest,
	addTicket
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
		Ticket.find({flight: flight._id}, function(err, tickets) {
			res.render('flights/show', {title: 'Details', flight, tickets});
		});
	});
}

function createDest(req, res) {
	let destination = req.body;
	Flight.findById(req.params.id, function(err, flight) {
		flight.destinations.push(destination);
		flight.save(); //.then(result => console.log(result)).catch(error => console.log(error));
		Ticket.find({flight: flight._id}, function(err, tickets) {
			res.render(`flights/show`, {title: 'Details', flight, tickets});
		});
	});
}

function addTicket(req, res) {
	let ticket = req.body;
	ticket["flight"] = req.params.id;
	ticket = new Ticket(ticket);
	console.log(ticket);
	ticket.save();
	res.redirect("/flights/" + req.params.id);
}
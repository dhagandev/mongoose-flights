var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var destinationSchema = new Schema({
	airport: {
		type: String, 
		enum: ['AUS', 'DAL', 'LAX', 'SEA'], 
		required: true
	},
	arrival: {
		type: Date,
		required: true
	}
});

var flightSchema = new Schema({
	airline: {
		type: String,
		enum: ['American', 'Southwest', 'United'],
		required: true
	},
	flightNo: {
		type: Number,
		min: 10,
		max: 9999,
		required: true
	},
	departs: {
		type: Date,
		default: function() {
			console.log(" CREATE DEFAULT DATE")
			let year = new Date().getFullYear() + 1;
			let datedYear = new Date().setFullYear(year);
			console.log("DATE IS " + datedYear)
			return datedYear;
		}
	},
	airport: {
		type: String,
		enum: ['AUS', 'DAL', 'LAX', 'SEA'], 
		default: function() {
			return 'SEA';
		}
	},
	destinations: [destinationSchema]
});

module.exports = mongoose.model('Flight', flightSchema);
const Guest = require('../schema/guest');

// Defining all methods and business logic for routes

module.exports = {
	findAll: function(req, res) {
		// Guest.create({
		// 	name: 'Robert Mill',
		// 	phone: '(212) 312-7821',
		// 	email: 'robert@gmail.com',
		// 	checkOut: new Date()
		// })
		// 	.then(newguest => res.json(newguest))
		// 	.catch(err => res.status(422).json(err));
		Guest.find(req.query)
			.then(guests => res.json(guests))
			.catch(err => res.status(422).json(err));
	},
	findById: function(req, res) {
		Guest.findById(req.params.id)
			.then(guest => res.json(guest))
			.catch(err => res.status(422).json(err));
	},
	create: function(req, res) {
		Guest.create(req.body)
			.then(newguest => res.json(newguest))
			.catch(err => res.status(422).json(err));
	},
	update: function(req, res) {
		Guest.findOneAndUpdate({ _id: req.params.id }, req.body)
			.then(guest => res.json(guest))
			.catch(err => res.status(422).json(err));
	},
	remove: function(req, res) {
		Guest.findById({ _id: req.params.id })
			.then(guest => guest.remove())
			.then(allguests => res.json(allguests))
			.catch(err => res.status(422).json(err));
	}
};
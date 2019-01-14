const Store = require('../schema/store');

// Defining all methods and business logic for routes

module.exports = {
	findAll: function(req, res) {
		Store.find(req.query)
			.then(stores => res.json(stores))
			.catch(err => res.status(422).json(err));
	},
	findById: function(req, res) {
		Store.findById(req.params.id)
			.then(store => res.json(store))
			.catch(err => res.status(422).json(err));
	},
	create: function(req, res) {
		Store.create(req.body)
			.then(newstore => res.json(newstore))
			.catch(err => res.status(422).json(err));
	},
	update: function(req, res) {
		Store.findOneAndUpdate({ _id: req.params.id }, req.body)
			.then(store => res.json(store))
			.catch(err => res.status(422).json(err));
	},
	remove: function(req, res) {
		Store.findById({ _id: req.params.id })
			.then(store => store.remove())
			.then(allstores => res.json(allstores))
			.catch(err => res.status(422).json(err));
	}
};
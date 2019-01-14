const router = require('express').Router();
const guestController = require('../controllers/guestController');

router
	.route('/')
	.get(guestController.findAll)
	.post(guestController.create);

router
	.route('/:id')
	.get(guestController.findById)
	.put(guestController.update)
	.delete(guestController.remove);

module.exports = router;
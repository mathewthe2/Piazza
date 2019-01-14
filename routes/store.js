const router = require('express').Router();
const storeController = require('../controllers/storeController');

router
	.route('/')
	.get(storeController.findAll)
	.post(storeController.create);

router
	.route('/:id')
	.get(storeController.findById)
	.put(storeController.update)
	.delete(storeController.remove);

module.exports = router;
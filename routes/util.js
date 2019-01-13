const router = require('express').Router();
const translateController = require('../controllers/translateController');

router
	.route('/translate')
	.post(translateController.translate)

module.exports = router;
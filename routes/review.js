const router = require('express').Router();
const auth = require('./auth');
const reviewController = require('../controllers/reviewController');

router
	.route('/')
	.get(reviewController.findAll)

router
	.route('/dianping')
	.get(auth.required, reviewController.findDianPingReviews)

module.exports = router;
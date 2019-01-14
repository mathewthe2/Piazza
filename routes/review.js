const router = require('express').Router();
const reviewController = require('../controllers/reviewController');

router
	.route('/')
	.get(reviewController.findAll)

router
	.route('/dianping')
	.get(reviewController.findDianPingReviews)

module.exports = router;
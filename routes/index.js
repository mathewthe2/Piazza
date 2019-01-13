const router = require('express').Router();
const messageRoutes = require('./message');
const userRoutes = require('./user');
const utilRoutes = require('./util');
const reviewRoutes = require('./review');
const conversationRoutes = require('./conversation');
const path = require('path');

router.use('/util', utilRoutes);
router.use('/message', messageRoutes);
router.use('/conversation', conversationRoutes);
router.use('/user', userRoutes);
router.use('/review', reviewRoutes);

router.use(function(req, res) {
	res.sendFile(path.join(__dirname, '../client/build/index.html'));
});

module.exports = router;
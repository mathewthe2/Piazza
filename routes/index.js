const router = require('express').Router();
const messageRoutes = require('./message');
const userRoutes = require('./user');
const conversationRoutes = require('./conversation');
const path = require('path');

router.use('/message', messageRoutes);
router.use('/conversation', conversationRoutes);
router.use('/user', userRoutes);

router.use(function(req, res) {
	res.sendFile(path.join(__dirname, '../client/build/index.html'));
});

module.exports = router;
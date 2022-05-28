const express = require('express');
const videos = require('../api/video/routes');
const users = require('../api/user/routes');
const passport = require('passport');

const router = express.Router();

require('../api/user/auth');

router.use('/videos', videos);
router.use('/users', users);

module.exports = router;
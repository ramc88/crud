const express = require('@awaitjs/express');
const controller = require('./controller');
const passport = require('passport');

const router = express.Router();

router.getAsync('/', passport.authenticate('bearer', { session: false }), controller.getVideos);
router.postAsync('/', passport.authenticate('bearer', { session: false }), controller.createVideo);
router.getAsync('/:id', passport.authenticate('bearer', { session: false }), controller.getVideo);
router.patchAsync('/:id', passport.authenticate('bearer', { session: false }), controller.updateVideo);
router.deleteAsync('/:id', passport.authenticate('bearer', { session: false }), controller.deleteVideo);

module.exports = router;
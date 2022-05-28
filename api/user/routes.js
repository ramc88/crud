const express = require('@awaitjs/express');
const controller = require('./controller');
const passport = require('passport');

const router = express.Router();

router.postAsync('/login', controller.login);
router.postAsync('/', controller.createUser);
router.getAsync('/:id', passport.authenticate('bearer', { session: false }), controller.getUser);
router.patchAsync('/:id', passport.authenticate('bearer', { session: false }), controller.updateUser);
router.deleteAsync('/:id', passport.authenticate('bearer', { session: false }), controller.deleteUser);

module.exports = router;
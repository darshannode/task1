const express = require('express')
const router = express.Router()

const usersController = new (require('./../Controllers/user'))();
const authenticate = (new (require('./../MiddleWares/Authenticator/Authenticator'))()).authenticate;

//ROUTES
router.route('/register').post(usersController.register);

router.route('/login').post(usersController.login);

router.route('/profile').get(authenticate, usersController.getUserProfile);

module.exports = router
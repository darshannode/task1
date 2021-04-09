const express = require('express')
const router = express.Router()

const productsController = new (require('./../Controllers/product'))();
const authenticate = (new (require('./../MiddleWares/Authenticator/Authenticator'))()).authenticate;
const fileManager = new (require('./../Configs/fileManager'))();

//ROUTES
router.route('/').post(authenticate, fileManager.upload().any(), productsController.add);

router.route('/search').post(authenticate, productsController.list);

module.exports = router
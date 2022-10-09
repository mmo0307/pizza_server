const Router = require('express');
const router = new Router();
const addressController = require('../controller/address.controller');

router.get('/addresses', addressController.getAddress);

module.exports = router;
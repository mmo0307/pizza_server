const Router = require('express');
const router = new Router();
const addressController = require('../controller/address.controller');

router.get('/addresses', addressController.getAddress);
router.post('/save-address', addressController.saveAddress);
router.put('/update-address', addressController.updateAddress);
router.delete('/admin/addresses/delete/:id', addressController.deleteAddress);

module.exports = router;
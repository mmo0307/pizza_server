const Router = require('express');
const router = new Router();
const userController = require('../controller/user.controller');

router.get('/allUser', userController.getAllUser);

router.post('/registration', userController.createUser);
router.post('/login', userController.loginUser);
router.get('/userOrders/:id', userController.ordersUser);

router.get('/admin/allOrders', userController.allOrders);
router.delete('/admin/deleteOrders/:id', userController.deleteOrders);

router.post('/success-order', userController.successOrder);

module.exports = router;
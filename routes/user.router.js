const Router = require('express');
const router = new Router();
const userController = require('../controller/user.controller');

router.post('/registration', userController.createUser);
router.post('/login', userController.loginUser);
router.delete('/:id', userController.deleteUser);

router.post('/success-order', userController.successOrder);

module.exports = router;
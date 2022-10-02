const Router = require('express');
const router = new Router();
const userController = require('../controller/user.controller');

router.post('/login', userController.createUser);
// router.put('/user/:id', userController.updateUser);
// router.get('/user', userController.getUsers);
// router.get('/user/:id', userController.getOneUser);
router.delete('/:id', userController.deleteUser);

module.exports = router;
const Router = require('express');
const router = new Router();
const RolesController = require('../controller/roles.controller');

router.get('/roles', RolesController.getRoles);
router.post('/save-roles', RolesController.saveRoles);
router.put('/update-roles', RolesController.updateRoles);
router.delete('/admin/roles/delete/:id', RolesController.deleteRoles);

module.exports = router;
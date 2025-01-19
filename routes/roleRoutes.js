const express = require('express');
const RoleController = require('../controller/roleController');

const router = express.Router();

router.post('/', RoleController.createRole);
router.get('/', RoleController.getAllRole);
router.get('/:id', RoleController.getRole);
router.put('/:id', RoleController.updateRole);
router.delete('/:id', RoleController.deleteRole);

module.exports = router;
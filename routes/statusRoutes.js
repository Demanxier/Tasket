const express = require('express');
const StatusController = require('../controller/statusController');

const router = express.Router();

router.post('/', StatusController.createStatus);
router.get('/', StatusController.getAllStatus);
router.get('/:id', StatusController.getStatus);
router.put('/:id', StatusController.updateStatus);
router.delete('/:id', StatusController.deleteStatus);

module.exports = router;
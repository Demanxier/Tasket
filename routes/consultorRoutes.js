const express = require('express');
const ConsultorController = require('../controller/ConsultorController');

const router = express.Router();

router.post('/', ConsultorController.createConsultor);
router.get('/', ConsultorController.getAllConsultor);
router.get('/:id', ConsultorController.getConsultor);
router.post('/nome', ConsultorController.getConsultorNome);
router.put('/:id', ConsultorController.updateConsultor);
router.delete('/:id', ConsultorController.deleteConsultor);

module.exports = router;
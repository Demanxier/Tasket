const express = require('express');
const ChamandoController = require('../controller/chamadoController');

const router = express.Router();

router.post('/', ChamandoController.createChamado);
router.get('/', ChamandoController.getAllChamados);
router.get('/:id', ChamandoController.getChamado);
router.get('/ticket/:ticket_id', ChamandoController.getChamadoTicketId);
router.get('/status/:id_status', ChamandoController.getChamadoIdStatus);
router.put('/:id', ChamandoController.updateChamado);
router.delete('/:id', ChamandoController.deleteChamado);

module.exports = router;
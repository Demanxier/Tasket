const express = require('express');
const TarefaController = require('../controller/tarefaController');

const router = express.Router();

router.post('/', TarefaController.createTarefa);
router.get('/', TarefaController.getAllTarefa);
router.get('/:id', TarefaController.getTarefa);
router.get('/status/:id_status', TarefaController.getTarefaStatus);
router.put('/:id', TarefaController.updateTarefa);
router.delete('/:id', TarefaController.deleteTarefa);

module.exports = router;
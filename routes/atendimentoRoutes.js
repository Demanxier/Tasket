const express = require('express');
const AtendimentoController = require('../controller/atendimentoController');

const router = express.Router();

router.post('/', AtendimentoController.createAtendimento);
router.get('/', AtendimentoController.getAllAtendimento);
router.get('/:id', AtendimentoController.getAtendimento);
router.get('/data/:data', AtendimentoController.getAtendimentoHoje);
router.get('/periodo/:datIni/:datFim', AtendimentoController.getAtendimentoSemana);
router.put('/:id', AtendimentoController.updateAtendimento);
router.delete('/:id', AtendimentoController.deleteAtendimento);

module.exports = router;
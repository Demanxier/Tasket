const AtendimentoService = require('../services/atendimentoService');

class AtendimentoController {
    static async createAtendimento(req, res, next) {
        try {
            const atendimentoId = await AtendimentoService.createAtendimento(req.body);
            res.status(201).json({ id: atendimentoId });
        } catch (error) {
            next(error);
        }
    }
    static async getAtendimento(req, res, next) {
        try {
            const atendimento = await AtendimentoService.getAtendimentoById(req.params.id);
            res.json(atendimento);
        } catch (error) {
            next(error);
        }
    }
    static async getAtendimentoHoje(req, res, next) {
        try {
            const atendimento = await AtendimentoService.getAtendimentoHoje(req.params.data);
            res.json(atendimento);
        } catch (error) {
            next(error);
        }
    }
    static async getAtendimentoSemana(req, res, next) {
        try {
            const atendimento = await AtendimentoService.getAtendimentoSemana(req.params.datIni, req.params.datFim);
            res.json(atendimento);
        } catch (error) {
            next(error);
        }
    }
    static async getAllAtendimento(req, res, next) {
        try {
            const atendimento = await AtendimentoService.getAllAtendimento();
            res.json(atendimento);
        } catch (error) {
            next(error);
        }
    }
    static async updateAtendimento(req, res, next) {
        try {
            await AtendimentoService.updateAtendimento(req.params.id, req.body);
            res.sendStatus(204);
        } catch (error) {
            next(error);
        }
    }
    static async deleteAtendimento(req, res, next) {
        try {
            await AtendimentoService.deleteAtendimento(req.params.id);
            res.sendStatus(204);
        } catch (error) {
            next(error);
        }
    }
}
module.exports = AtendimentoController;
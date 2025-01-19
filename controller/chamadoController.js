const ChamadosService = require('../services/chamadosService');

class ChamandoController{
    static async createChamado(req, res, next){
        try {
            const chamadoId = await ChamadosService.createChamado(req.body);
            res.status(201).json({ id: chamadoId });
        } catch (error) {
            next(error);
        }
    }
    static async getChamado(req, res, next){
        try {
            const chamado = await ChamadosService.getChamadoById(req.params.id);
            res.json(chamado);
        } catch (error) {
            next(error);
        }
    }
    static async getChamadoTicketId(req, res, next){
        try {
            const chamado = await ChamadosService.getChamadoByTicket(req.params.ticket_id);
            res.json(chamado);
        } catch (error) {
            next(error);
        }
    }
    static async getChamadoIdStatus(req, res, next){
        try {
            const chamado = await ChamadosService.getChamadoByStatus(req.params.id_status);
            res.json(chamado);
        } catch (error) {
            next(error);
        }
    }
    static async getAllChamados(req, res, next){
        try {
            const chamados = await ChamadosService.getAllChamados();
            res.json(chamados);
        } catch (error) {
            next(error);
        }
    }
    static async updateChamado(req, res, next){
        try {
            await ChamadosService.updateChamado(req.params.id, req.body);
            res.sendStatus(204);
        } catch (error) {
            next(error);
        }
    }
    static async deleteChamado(req, res, next){
        try {
            await ChamadosService.deleteChamado(req.params.id);
            res.sendStatus(204);
        } catch (error) {
            next(error);
        }
    }
}
module.exports = ChamandoController;
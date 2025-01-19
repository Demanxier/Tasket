const ConsultorService = require('../services/consultorService');

class ConsultorController {
    static async createConsultor(req, res, next){
        try {
            const consultorId = await ConsultorService.createConsultor(req.body);
            res.status(201).json({ id: consultorId });
        } catch (error) {
            next(error);
        }
    }
    static async getConsultor(req, res, next){
        try {
            const consultor = await ConsultorService.getConsultorById(req.params.id);
            res.json(consultor);
        } catch (error) {
            next(error);
        }
    }
    static async getConsultorNome(req, res, next){
        try {
            const consultor = await ConsultorService.getConsultorByNome(req.body);
            res.json(consultor);
        } catch (error) {
            next(error);
        }
    }
    static async getAllConsultor(req, res, next){
        try {
            const consultor = await ConsultorService.getAllConsultor();
            res.json(consultor);
        } catch (error) {
            next(error);
        }
    }
    static async updateConsultor(req, res, next){
        try {
            await ConsultorService.updateConsultor(req.params.id, req.body);
            res.sendStatus(204);
        } catch (error) {
            next(error);
        }
    }
    static async deleteConsultor(req, res, next){
        try {
            await ConsultorService.deleteConsultor(req.params.id);
            res.sendStatus(204);
        } catch (error) {
            next(error);
        }
    }
}
module.exports = ConsultorController;
const StatusService = require('../services/statusService');

class StatusController{
    static async createStatus(req, res, next){
        try {
            const statusId = await StatusService.createStatus(req.body);
            res.status(201).json({ id: statusId });
        } catch (error) {
            next(error);
        }
    }
    static async getStatus(req, res, next){
        try {
            const status = await StatusService.getStatusById(req.params.id);
            res.json(status);
        } catch (error) {
            next(error);
        }
    }
    static async getAllStatus(req, res, next){
        try {
            const status = await StatusService.getAllStatus();
            res.json(status);
        } catch (error) {
            next(error);
        }
    }
    static async updateStatus(req, res, next){
        try {
            await StatusService.updateStatus(req.params.id, req.body);
            res.sendStatus(204);
        } catch (error) {
            next(error);
        }
    }
    static async deleteStatus(req, res, next){
        try {
            await StatusService.deleteStatus(req.params.id);
            res.sendStatus(204);
        } catch (error) {
            next(error);
        }
    }
}
module.exports = StatusController;
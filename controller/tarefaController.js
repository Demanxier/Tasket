const TarefaService = require('../services/tarefaService');

class TarefaController{
    static async createTarefa(req, res, next){
        try {
            const tarefaID = await TarefaService.createTarefa(req.body);
            res.status(201).json({ id: tarefaID });
        } catch (error) {
            next(error);
        }
    }
    static async getTarefa(req, res, next){
        try {
            const tarefa = await TarefaService.getTarefaById(req.params.id);
            res.json(tarefa);
        } catch (error) {
            next(error);
        }
    }
    static async getAllTarefa(req, res, next){
        try {
            const tarefa = await TarefaService.getAllTarefa();
            res.json(tarefa);
        } catch (error) {
            next(error);
        }
    }
    static async getTarefaStatus(req, res, next){
        try {
            const tarefa = await TarefaService.getTarefaStatus(req.params.id_status);
            res.json(tarefa);
        } catch (error) {
            next(error);
        }
    }
    static async updateTarefa(req, res, next){
        try {
            await TarefaService.updateTarefa(req.params.id, req.body);
            res.sendStatus(204);
        } catch (error) {
            next(error);
        }
    }
    static async deleteTarefa(req, res, next){
        try {
            await TarefaService.deleteTarefa(req.params.id);
            res.sendStatus(204);
        } catch (error) {
            next(error);
        }
    }
}
module.exports = TarefaController;
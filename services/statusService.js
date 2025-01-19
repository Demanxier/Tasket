const Status = require('../models/Status');
const CustomError = require('../exception/CustomError');

class StatusService {
    static async createStatus(data){
        try {
            return await Status.create(data);
        } catch (error) {
            throw new CustomError('Erro ao tentar criar novo status.', 400);
        }
    }
    static async getStatusById(id){
        const status = await Status.findById(id);
        if(!status) throw new CustomError('Status não encontrado.', 404);
    }
    static async getAllStatus(){
        return await Status.findAll();
    }
    static async updateStatus(id, data){
        const updated = await Status.update(id, data);
        if(!updated) throw new CustomError('Erro ao tentar atualizar o status.', 400);
    }
    static async deleteStatus(id){
        const deleted = await Status.delete(id);
        if(!deleted) throw new CustomError('Erro ao tentar deletar o status.', 400);
    }
}
module.exports = StatusService;
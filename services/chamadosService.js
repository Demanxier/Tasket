const Chamados = require('../models/Chamados');
const CustomError = require('../exception/CustomError');

class ChamadosService{
    static async createChamado(data) {
        try {
            return await Chamados.create(data);
        } catch (error) {
            throw new CustomError('Error ao tentar criar um chamado.', 400);
        }
    }
    static async getChamadoById(id){
        const chamado = await Chamados.findById(id);
        if(!chamado) throw new CustomError('Chamado não encontrado.', 404);
        return chamado;
    }
    static async getChamadoByTicket(ticket_id){
        const chamado = await Chamados.findChamadoByTicket(ticket_id);
        if(!chamado) throw new CustomError(`Não foi encontrado ticket do movidesk com o id: ${ticket_id}.`, 404);
        return chamado;
    }
    static async getChamadoByStatus(id_status){
        const chamado = await Chamados.findChamadoByStatus(id_status);
        if(!chamado) throw new CustomError('Não há chamados neste status.', 404);
        return chamado;
    }
    static async getAllChamados() {
        return await Chamados.findAll();
    }
    static async updateChamado(id, data) {
        const updated = await Chamados.update(id, data);
        if(!updated) throw new CustomError('Erro ao tentar atualizar chamado', 400);
    }
    static async deleteChamado(id){
        const deleted = await Chamados.delete(id);
        if(deleted) throw new CustomError('Erro ao deletar chamado', 400);
    }
}
module.exports = ChamadosService;
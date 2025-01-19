const Atendimento = require('../models/Atendimento');
const CustomError = require('../exception/CustomError');

class AtendimentoService {
    static async createAtendimento(data){
        try {
            return await Atendimento.create(data);
        } catch (error) {
            throw new CustomError('Erro ao tentar criar um Atendimento.', 400);
        }
    }
    static async getAtendimentoById(id){
        const atendimento = await Atendimento.findById(id);
        if(!atendimento) throw new CustomError(`Atendimento de ID: ${id}, não foi encontrado.`, 404);
        return atendimento;
    }
    static async getAtendimentoHoje(data){
        const atendimento = await Atendimento.findByAtendimentoHoje(data);
        if(!atendimento)  throw new CustomError('Não há atendimentos hoje.', 404);
        return atendimento;
    }
    static async getAtendimentoSemana(datIni, datFim){
        const atendimento = await Atendimento.findBySemana(datIni, datFim);
        if(!atendimento) throw new CustomError('Não há atendimentos neste período.', 404);
        return atendimento;
    }
    static async getAllAtendimento(){
        return await Atendimento.findAll();
    }
    static async updateAtendimento(id, data){
        const updated = await Atendimento.update(id, data);
        if(!updated) throw new CustomError(`Erro ao tentar atualizar o atendimento de ID: ${id}.`, 400);
    }
    static async deleteAtendimento(id){
        const deleted = await Atendimento.delete(id);
        if(!deleted) throw new CustomError(`Erro ao tentar deletar o atendmento de ID: ${id}`, 400);
    }
}
module.exports = AtendimentoService;
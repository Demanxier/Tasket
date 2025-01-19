const Consultor = require('../models/Consultor');
const CustomError = require('../exception/CustomError');

class ConsultorService{
    static async createConsultor(data){
        try {
            return await Consultor.create(data);
        } catch (error) {
            throw new CustomError('Erro ao tentar criar novo consultor.', 400);
        }
    }
    static async getConsultorById(id){
        const constultor = await Consultor.findById(id);
        if(!constultor) throw new CustomError('Consultor não encontrado.', 404);
        return constultor;
    }
    static async getConsultorByNome(nome){
        const consultor = await Consultor.findByNome(nome);
        if(!consultor) throw new CustomError('Consultor não encontrado.', 404);
        return consultor;
    }
    static async getAllConsultor(){
        return await Consultor.findAll();
    }
    static async updateConsultor(id, data){
        const updated = await Consultor.update(id, data);
        if(!updated) throw new CustomError('Erro ao tentar atualizar os dados do consultor.', 400);
    }
    static async deleteConsultor(id){
        const deleted = await Consultor.delete(id);
        if(!deleted) throw new CustomError('Erro ao tentar deletar consultor.', 400);
    }
}
module.exports = ConsultorService;
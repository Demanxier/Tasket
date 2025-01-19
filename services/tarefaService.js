const Tarefa = require('../models/Tarefa');
const CustomError = require('../exception/CustomError');

class TarefaService{
    static async createTarefa(data){
        try {
            return Tarefa.create(data);
        } catch (error) {
            throw new CustomError('Erro ao tentar criar a tarefa.', 400);
        }
    }
    static async getTarefaById(id){
        const tarefa = await Tarefa.findById(id);
        if(!tarefa) throw new CustomError(`Tarefa de ID: ${id}, não foi encontrado`, 404);
        return tarefa;
    }
    static async getAllTarefa(){
        return await Tarefa.findAll();
    }
    static async getTarefaStatus(id_status){
        const tarefa = await Tarefa.findTarefaStatus(id_status);
        if(!tarefa) throw new CustomError('Não há tarefas neste status.', 404);
        return tarefa;
    }
    static async updateTarefa(id, data){
        const updated = await Tarefa.update(id, data);
        if(!updated) throw new CustomError(`ERRO: Tarefa de ID: ${id}, não foi atualizada.`, 400);
    }
    static async deleteTarefa(id){
        const deleted = await Tarefa.delete(id);
        if(!deleted) throw new CustomError(`ERRO: Tarefa de ID: ${id}, não foi deletada.`, 400);
    }
}
module.exports = TarefaService;
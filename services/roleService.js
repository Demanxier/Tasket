const Role = require('../models/Role');
const CustomError = require('../exception/CustomError');

class RoleService {
    static async CreateRole(data){
        try {
            return await Role.create(data);
        } catch (error) {
            throw new CustomError('Erro ao tentar criar role', 400);
        }
    }
    static async getRoleById(id){
        const role = await Role.findById(id);
        if(!role) throw new CustomError('Role não encontrada.', 404);
        return role;
    }
    static async getAllRole(){
        const role = await Role.findAll();
        if(role = null) throw new CustomError('Não há roles cadastradas', 404);
        return role;
    }
    static async updateRole(id, data){
        const updated = await Role.update(id, data);
        if(!updated) throw new CustomError('Erro ao tentar atualizar role', 400);
    }
    static async deleteRole(id){
        const deleted = await Role.delete(id);
        if(!deleted) throw new CustomError('Erro ao tentar deletar role', 400);
    }
}

module.exports = RoleService;
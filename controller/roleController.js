const RoleService = require('../services/roleService');

class RoleController{
    static async createRole(req, res, next){
        try {
            const roleId = await RoleService.CreateRole(req.body);
            res.status(201).json({ id: roleId });
        } catch (error) {
            next(error);
        }
    }

    static async getRole(req, res, next){
        try {
            const role = await RoleService.getRoleById(req.params.id);
            res.json(role);
        } catch (error) {
            next(error);
        }
    }

    static async getAllRole(req, res, next){
        try {
            const roles = await RoleService.getAllRole();
            res.json(roles);
        } catch (error) {
            next(error);
        }
    }

    static async updateRole(req, res, next){
        try {
            await RoleService.updateRole(req.params.id, req.body);
            res.sendStatus(204);
        } catch (error) {
            next(error);
        }
    }

    static async deleteRole(req, res, next){
        try {
            await RoleService.deleteRole(req.params.id);
            res.sendStatus(204);
        } catch (error) {
            next(error);
        }
    }
}

module.exports = RoleController;
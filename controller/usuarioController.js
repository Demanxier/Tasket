const UsuarioService = require('../services/usuarioService');

/**
 * Classe UsuarioController contém os controladores responsáveis por intermediar 
 * as requisições e respostas relacionadas à entidade "Usuario".
 */
class UsuarioController {
     /**
     * Endpoint para criar um novo usuário.
     * Recebe os dados do corpo da requisição, chama o serviço correspondente e retorna o ID do novo usuário.
     */
    static async createUsuario(req, res, next) {
        try {
            const userId = await UsuarioService.createUsuario(req.body);
            res.status(201).json({ id: userId });
        } catch (error) {
            next(error);
        }
    }
    /**
     * Endpoint para buscar um usuário pelo ID.
     * Recebe o ID como parâmetro da rota e retorna os dados do usuário.
     */
    static async getUsuario(req, res, next) {
        try {
            const usuario = await UsuarioService.getUsuarioById(req.params.id);
            res.json(usuario);
        } catch (error) {
            next(error);
        }
    }
    /**
     * Endpoint para listar todos os usuários.
     * Retorna uma lista de todos os usuários cadastrados.
     */
    static async getAllUsuarios(req, res, next) {
        try {
            const usuarios = await UsuarioService.getAllUsuarios;
            res.json(usuarios);
        } catch (error) {
            next(error);
        }
    }
    /**
     * Endpoint para atualizar os dados de um usuário.
     * Recebe o ID como parâmetro da rota e os dados atualizados no corpo da requisição.
     */
    static async updateUsuario(req, res, next) {
        try {
            await UsuarioService.updateUsuario(req.params.id, req.body);
            res.sendStatus(204); // Resposta 204: Nenhum conteúdo (indica sucesso sem retorno de dados)
        } catch (error) {
            next(error);
        }
    }
    /**
     * Endpoint para deletar um usuário pelo ID.
     * Recebe o ID como parâmetro da rota e remove o usuário correspondente.
     */
    static async deleteUsuario(req, res, next) {
        try {
            await UsuarioService.deleteUsuario(req.params.id);
            res.sendStatus(204);
        } catch (error) {
            next(error);
        }
    }
    /**
     * Endpoint para login de um usuário.
     * Recebe email e senha no corpo da requisição e retorna um token JWT e os dados do usuário.
     */
    static async loginUsuario(req, res, next) {
        try {
            const { token, usuario } = await UsuarioService.loginUsuario(req.body);
            res.json({ token, usuario });
        } catch (error) {
            next(error);
        }
    }
}
module.exports = UsuarioController;
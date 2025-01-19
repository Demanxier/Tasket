const Usuario = require('../models/Usuario');
const CustomError = require('../exception/CustomError');
const jwt = require('jsonwebtoken'); //Biblioteca para geração e verificação de tokens JWT
const bcrypt =require('bcrypt'); //Biblioteca para comparação de senhas
const dotenv = require('dotenv');
dotenv.config();

//Chave secreta e configuração do token JWT
const JWT_SECRET = process.env.JWT_SECRET;
const JWT_EXPIRES_IN = '1h'; 

/**
 * Classe UsuarioService contém a lógica de negócios para manipulação de usuários.
 */
class UsuarioService {
    /**
     * Cria um novo usuário.
     * @param {Object} data - Dados do usuário (nome, email, senha, id_role).
     * @returns {Number} - ID do usuário criado.
     */
    static async createUsuario(data) {
        try {
            return await Usuario.create(data);
        } catch (error) {
            throw new CustomError('Erro ao criar usuário', 400);
        }
    }
    /**
     * Busca um usuário pelo ID.
     * @param {Number} id - ID do usuário.
     * @returns {Object} - Dados do usuário encontrado.
     */
    static async getUsuarioById(id) {
        const usuario = await Usuario.findById(id);
        if (!usuario) throw new CustomError('Usuário não encontrado', 404);
        return usuario;
    }
    /**
     * Retorna todos os usuários cadastrados.
     * @returns {Array} - Lista de usuários.
     */
    static async getAllUsuarios() {
        return Usuario.findAll();
    }
    /**
     * Atualiza os dados de um usuário.
     * @param {Number} id - ID do usuário a ser atualizado.
     * @param {Object} data - Dados atualizados do usuário.
     */
    static async updateUsuario(id, data) {
        const updated = await Usuario.update(id, data);
        if (!updated) throw new CustomError('Erro ao atualizar usuário', 400);
    }
    /**
     * Deleta um usuário pelo ID.
     * @param {Number} id - ID do usuário.
     */
    static async deleteUsuario(id) {
        const deleted = await Usuario.delete(id);
        if (!deleted) throw new CustomError('Erro ao deletar usuário', 400);
    }

    /**
     * Realiza o login de um usuário.
     * @param {Object} data - Dados para login (email, senha).
     * @returns {Object} - Token JWT e dados do usuário.
     */
    static async loginUsuario({ email, senha }) {
        // Busca o usuário pelo email
        const usuario = await Usuario.login(email);
        if (!usuario) throw new CustomError('Usuário não encontrado', 404);

        // Verifica se a senha está correta
        const isPasswordValid = await bcrypt.compare(senha, usuario.senha);
        if (!isPasswordValid) throw new CustomError('Credenciais inválidas', 401);

        // Gera o token JWT
        const token = jwt.sign({ id: usuario.id, email: usuario.email }, JWT_SECRET, { expiresIn: JWT_EXPIRES_IN });

        // Retorna o token e os dados do usuário
        return { token, usuario: { id: usuario.id, nome: usuario.nome, email: usuario.email } };
    }
}
module.exports = UsuarioService;
// Importação do pool de conexão com o banco de dados
const pool = require('../config/database');
//Biblioteca de criptografica de senhas
const bcrypt = require('bcrypt');

/**
 * Classe Usuario representa a tabela 'usuario' no banco de dados e fornece métodos para interagir com ela.
 */
class Usuario {
    /**
     * Cria um novo usuário no banco de dados.
     * @param {Object} data - Dados do usuário (nome, email, senha, id_role).
     * @returns {Number} - ID do usuário criado.
     */
    static async create({ nome, email, senha, id_role }) {
        const hashedPassword = await bcrypt.hash(senha, 10); //Criptografia a senha com fator de custo 10.
        const [result] = await pool.query(
            `INSERT INTO usuario (nome, email, senha, id_role) VALUES (?, ?, ?, ?)`,
            [nome, email, hashedPassword, id_role]
        );
        return result.insertId;
    }
    /**
     * Busca um usuário pelo ID.
     * @param {Number} id - ID do usuário.
     * @returns {Object} - Dados do usuário.
     */
    static async findById(id) {
        const [rows] = await pool.query(`SELECT * FROM usuario WHERE id = ?`, [id]);
        return rows[0];
    }
    /**
     * Retorna todos os usuários.
     * @returns {Array} - Lista de todos os usuários.
     */
    static async findAll() {
        return await pool.query(`SELECT * FROM usuario`);
    }
    /**
     * Atualiza um usuário no banco de dados.
     * @param {Number} id - ID do usuário a ser atualizado.
     * @param {Object} data - Dados atualizados (nome, email, senha, id_role).
     * @returns {Boolean} - True se atualizado com sucesso, false caso contrário.
     */
    static async update(id, { nome, email, senha, id_role }) {
        const hashedPassword = await bcrypt.hash(senha, 10); //Criptografar nova senha
        const [result] = await pool.query(
            `UPDATE usuario SET nome = ?, email = ?, senha = ?, id_role = ? WHERE id = ?`,
            [nome, email, hashedPassword, id_role, id]
        );
        return result.affectedRows > 0;
    }
        /**
     * Deleta um usuário pelo ID.
     * @param {Number} id - ID do usuário.
     * @returns {Boolean} - True se deletado com sucesso, false caso contrário.
     */
    static async delete(id) {
        const [result] = await pool.query(`DELETE FROM usuario WHERE id = ?`, [id]);
        return result.affectedRows > 0;
    }

        /**
     * Busca um usuário pelo email para login.
     * @param {String} email - Email do usuário.
     * @returns {Object} - Dados do usuário encontrado.
     */
    static async login(email){
        const [result] = await pool.query(`SELECT * FROM usuario WHERE email = ?`,
            [email]
        );
        return result[0];
    }
}

module.exports = Usuario;
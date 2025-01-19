const pool = require('../config/database');

class Tarefa {
    static async create({ nome, descricao, dataCriacao, id_status, id_usuario }){
        const [result] = await pool.query(
            `INSERT INTO tarefa (nome, descricao, dataCriacao, id_status, id_usuario) VALUES (?, ?, ?, ?, ?)`,
            [nome, descricao, dataCriacao, id_status, id_usuario]            
        );
        return result.insertId;
    }
    static async findById(id){
        const [rows] = await pool.query(`SELECT * FROM tarefa WHERE id = ?`, [id]);
        return rows[0];
    }
    static async findAll(){
        const [rows] = await pool.query(`SELECT * FROM tarefa`);
        return rows;
    }
    static async findTarefaStatus(id_status){
        const [rows] = await pool.query(`select * from tarefa where id_status = ?`, [id_status]);
        return rows;
    }
    static async update(id, { nome, descricao, dataCriacao, dataConclusao, id_status, id_usuario }){
        const [result] = await pool.query(
           //UPDATE tarefa SET nome = 'Tarefa 3', descricao = 'Alter', dataCriacao = '2025-01-18', dataConclusao = null, id_status = 3, id_usuario = 2 where id = 5;
            `UPDATE tarefa SET nome = ?, descricao = ?, dataCriacao = ?, dataConclusao = ?, id_status = ?, id_usuario = ? where id = ?`,
            [nome, descricao, dataCriacao, dataConclusao, id_status, id_usuario, id]
        );
        return result.affectedRows > 0;
    }
    static async delete(id){
        const [result] = await pool.query(`DELETE FROM tarefa WHERE id = ?`, [id]);
        return result.affectedRows > 0;
    }
}
module.exports = Tarefa;
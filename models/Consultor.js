const pool = require('../config/database');

class Consultor{
    static async create({ nome, email, custoHora }){
        const [result] = await pool.query(
            `INSERT INTO consultor (nome, email, custoHora) VALUES (?, ?, ?)`,
            [nome, email, custoHora]
        );
        return result.insertId;
    }
    static async findById(id){
        const [rows] = await pool.query(`SELECT * FROM consultor WHERE id = ?`, [id]);
        return rows[0];
    }
    static async findByNome(nome){
        const [rows] = await pool.query(`select * from consultor where nome = '?'`, [nome]);
        return rows[0];
    }
    static async findAll(){
        const [rows] = await pool.query(`SELECT * FROM consultor`);
        return rows;
    }
    static async update(id, { nome, email, custoHora }){
        const [result] = await pool.query(
            `UPDATE consultor SET nome = ?, email = ?, custoHora = ? WHERE id = ?`,
            [nome, email, custoHora, id]
        );
        return result.affectedRows > 0;
    }
    static async delete(id){
        const [result] = await pool.query(`DELETE FROM consultor WHERE id = ?`, [id]);
        return result.affectedRows > 0;
    }
}
module.exports = Consultor;
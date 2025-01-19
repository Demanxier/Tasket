const pool = require('../config/database');

class Status {
    static async create({ nome }){
        const [result] = await pool.query(
            `INSERT INTO status (nome) VALUES (?)`,
            [nome]
        );
        return result.insertId;
    }
    static async findById(id){
        const [rows] = await pool.query(`SELECT * FROM status WHERE id = ?`, [id]);
        return rows[0];
    }
    static async findAll(){
        return await pool.query(`SELECT * FROM status`);;
    }
    static async update(id, {nome}){
        const [result] = await pool.query(
            `UPDATE status SET nome = ? WHERE = id ?`,
            [nome, id]
        );
        return result.affectedRows > 0;
    }
    static async delete(id){
        const [result] = await pool.query(`DELETE FROM status WHERE id = ?`, [id]);
        return result.affectedRows > 0;
    }
}

module.exports = Status;